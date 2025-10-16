package models

import (
	"time"

	"github.com/google/uuid"
)

type SciTech2025Registration struct {
	ID                  uuid.UUID `gorm:"type:uuid;default:gen_random_uuid()"`
	FullName            string    `gorm:"not null;default:null"`
	Email               string    `gorm:"uniqueIndex"`
	Country             string    `gorm:"not null;default:null"`
	Organization        string    `gorm:"not null;default:null"`
	ParticipationFormat string    `gorm:"not null;default:null"`
	FullNameRU          *string   `gorm:"column:full_name_ru;"`
	IsPresenter         bool      `gorm:"not null;default:false"`
	ConfChairPaperID    *string   `gorm:"column:confchair_paper_id"`
	PaperTitle          *string
	CreatedAt           time.Time
}

func (SciTech2025Registration) TableName() string {
	return "scitech_2025_registration"
}
