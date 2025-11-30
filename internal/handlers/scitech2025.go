package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"spacescitech.com/internal/dto"
	"spacescitech.com/internal/models"
	"spacescitech.com/internal/services/mailing"
	"spacescitech.com/internal/utils"
)

type SciTech2025Handler struct {
	db     *gorm.DB
	mailer *mailing.Mailer
}

func NewSciTech2025Handler(db *gorm.DB, mailer *mailing.Mailer) *SciTech2025Handler {

	return &SciTech2025Handler{db: db, mailer: mailer}
}

func (h *SciTech2025Handler) Register(c *gin.Context) {

	var req dto.SciTech2025RegistrationRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorJSON(c, http.StatusBadRequest, "Invalid input")
		return
	}

	registration := &models.SciTech2025Registration{
		FullName:            req.FullName,
		Email:               req.Email,
		Organization:        req.Organization,
		ParticipationFormat: req.ParticipationFormat,
		FullNameRU:          req.FullNameRU,
		IsPresenter:         req.IsPresenter,
		ConfChairPaperID:    req.ConfChairPaperID,
		PaperTitle:          req.PaperTitle,
		Country:             req.Country,
	}

	if err := h.db.Create(registration).Error; err != nil {
		utils.ErrorJSON(c, http.StatusInternalServerError, "Failed to create user")
		return
	}

	response := dto.SciTech2025RegistrationResponse{
		ID:                  registration.ID,
		FullName:            registration.FullName,
		Email:               registration.Email,
		Organization:        registration.Organization,
		ParticipationFormat: registration.ParticipationFormat,
		FullNameRU:          registration.FullNameRU,
		IsPresenter:         registration.IsPresenter,
		ConfChairPaperID:    registration.ConfChairPaperID,
		PaperTitle:          registration.PaperTitle,
		Country:             registration.Country,
		CreatedAt:           registration.CreatedAt,
	}
	utils.SuccessJSON(c, http.StatusCreated, response)

	h.mailer.SendEmail("Registration for the 6th SciTech Forum",
		registration.Email,
		mailing.ExecuteStringTemplate("registration_complete",
			struct {
				FullName string
			}{
				FullName: registration.FullName,
			},
		))
}
