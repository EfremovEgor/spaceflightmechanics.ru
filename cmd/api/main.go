package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin" // or your favorite router
	"spacescitech.com/internal/config"
	"spacescitech.com/internal/database"
	"spacescitech.com/internal/handlers"
	"spacescitech.com/internal/services/mailing"
)

func main() {
	cfg := config.Load()
	if cfg == nil {
		log.Fatal("Cannot read env variables")
	}
	db, err := database.NewConnection(&cfg.Database)
	if err != nil {
		log.Fatal("Cannot connect to database:", err)
	}

	log.Println("Running migrations")
	database.Migrate(db)
	mailer := mailing.Init(
		mailing.MailCredential{
			From:     cfg.Mailing.From,
			Password: cfg.Mailing.Password,
			Port:     cfg.Mailing.Port,
			Host:     cfg.Mailing.Host,
		},
	)
	sciTech2025Handler := handlers.NewSciTech2025Handler(db, mailer)

	r := gin.Default()
	r.Use(cors.Default())

	api := r.Group("/api")
	{
		scitech2025 := api.Group("/scitech2025")
		{
			scitech2025.POST("/register", sciTech2025Handler.Register)
		}
	}

	log.Println("Running server")
	r.Run(cfg.Server.Host + ":" + cfg.Server.Port)
}
