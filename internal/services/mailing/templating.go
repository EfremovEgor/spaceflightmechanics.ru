package mailing

import (
	"embed"
	"fmt"
	"html/template"
	"io"
	"log"
	"slices"
	"strings"
)

//go:embed templates/*.html
var templateFS embed.FS

var templates = []string{"registration_complete"}

// Pre-compile templates at startup
var compiledTemplates = make(map[string]*template.Template)

func init() {
	// Pre-load all templates during initialization
	for _, tmplName := range templates {
		tmplPath := "templates/" + tmplName + ".html"
		t, err := template.ParseFS(templateFS, tmplPath)
		if err != nil {
			log.Printf("Warning: failed to pre-load template %s: %v", tmplName, err)
			continue
		}
		compiledTemplates[tmplName] = t
	}
}

func ExecuteTemplate(templateName string, data interface{}, w io.Writer) error {
	if !slices.Contains(templates, templateName) {
		return fmt.Errorf("no template found")
	}

	t, exists := compiledTemplates[templateName]
	if !exists {
		return fmt.Errorf("template '%s' not compiled", templateName)
	}

	return t.Execute(w, data)
}

func ExecuteStringTemplate(templateName string, data interface{}) string {
	var builder strings.Builder

	err := ExecuteTemplate(templateName, data, &builder)
	if err != nil {
		log.Printf("Error executing template %s: %v", templateName, err)
		return ""
	}

	s := builder.String()
	log.Println("Executed template " + templateName + ".html")
	log.Println(s)
	return s
}
