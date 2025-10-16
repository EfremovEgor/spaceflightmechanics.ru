package dto

import (
	"time"

	"github.com/google/uuid"
)

type SciTech2025RegistrationRequest struct {
	FullName            string  `json:"full_name"`
	Email               string  `json:"email"`
	Country             string  `json:"country"`
	Organization        string  `json:"organization"`
	ParticipationFormat string  `json:"participation_format"`
	FullNameRU          *string `json:"full_name_ru"`
	IsPresenter         bool    `json:"is_presenter"`
	ConfChairPaperID    *string `json:"confchair_paper_id"`
	PaperTitle          *string `json:"paper_title"`
}

type SciTech2025RegistrationResponse struct {
	ID                  uuid.UUID `json:"id"`
	FullName            string    `json:"full_name"`
	Email               string    `json:"email"`
	Country             string    `json:"country"`
	Organization        string    `json:"organization"`
	ParticipationFormat string    `json:"participation_format"`
	FullNameRU          *string   `json:"full_name_ru,omitempty"`
	IsPresenter         bool      `json:"is_presenter"`
	ConfChairPaperID    *string   `json:"confchair_paper_id,omitempty"`
	PaperTitle          *string   `json:"paper_title,omitempty"`
	CreatedAt           time.Time `json:"created_at"`
}
