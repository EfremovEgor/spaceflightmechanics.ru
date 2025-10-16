package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin" // or your favorite router
	"spacescitech.com/internal/config"
	"spacescitech.com/internal/database"
	"spacescitech.com/internal/handlers"
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

	database.Migrate(db)

	sciTech2025Handler := handlers.NewSciTech2025Handler(db)

	r := gin.Default()
	r.Use(cors.Default())

	api := r.Group("/api")
	{
		scitech2025 := api.Group("/scitech2025")
		{
			scitech2025.POST("/register", sciTech2025Handler.Register)
		}
	}

	r.Run(cfg.Server.Host + ":" + cfg.Server.Port)
}
