package handlers

import (
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"spacescitech.com/internal/dto"
	"spacescitech.com/internal/models"
	"spacescitech.com/internal/services/mailing"
	"spacescitech.com/internal/utils"
)

type SciTech2026Handler struct {
	db     *gorm.DB
	mailer *mailing.Mailer
}

func NewSciTech2026Handler(db *gorm.DB, mailer *mailing.Mailer) *SciTech2026Handler {

	return &SciTech2026Handler{db: db, mailer: mailer}
}

func (h *SciTech2026Handler) Register(c *gin.Context) {

	var req dto.SciTech2026RegistrationRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorJSON(c, http.StatusBadRequest, "Invalid input")
		return
	}
	req.Email = strings.TrimSpace(req.Email)

	var existing int64
	h.db.Model(&models.SciTech2026Registration{}).
		Where("lower(email) = lower(?)", req.Email).
		Count(&existing)
	if existing > 0 {
		utils.ErrorJSON(c, http.StatusConflict, "This email is already registered")
		return
	}

	registration := &models.SciTech2026Registration{
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
		log.Println("Failed to create 2026 registration:", err)
		utils.ErrorJSON(c, http.StatusInternalServerError, "Failed to create user")
		return
	}

	response := dto.SciTech2026RegistrationResponse{
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
	log.Println("Trying to send email to " + registration.Email)
	h.mailer.SendEmail("Registration for the 7th SciTech Forum",
		registration.Email,
		mailing.ExecuteStringTemplate("registration_complete_2026",
			struct {
				FullName string
			}{
				FullName: registration.FullName,
			},
		))
}
