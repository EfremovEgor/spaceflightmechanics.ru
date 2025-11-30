package main

import (
	"log"

	"spacescitech.com/internal/config"
	"spacescitech.com/internal/services/mailing"
)

func main() {
	cfg := config.Load()
	if cfg == nil {
		log.Fatal("Cannot read env variables")
	}
	mailer := mailing.Init(
		mailing.MailCredential{
			From:     cfg.Mailing.From,
			Password: cfg.Mailing.Password,
			Port:     cfg.Mailing.Port,
			Host:     cfg.Mailing.Host,
		},
	)
	mailer.SendEmail("Registration for the 6th SciTech Forum",
		"efremovegor936@yandex.ru",
		mailing.ExecuteStringTemplate("registration_complete",
			struct {
				FullName string
			}{
				FullName: "Efremov Egor",
			},
		))
	for {
	}
}
