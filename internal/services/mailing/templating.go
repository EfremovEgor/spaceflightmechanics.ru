package mailing

import (
	"bytes"
	"fmt"
	"html/template"
	"io"
	"slices"
)

var templates = []string{"registration_complete"}

func ExecuteTemplate(templateName string, data interface{}, w io.Writer) error {
	if !slices.Contains(templates, templateName) {
		return fmt.Errorf("no template found")

	}
	t, _ := template.ParseFiles("templates" + templateName + ".html")

	return t.Execute(w, data)
}

func ExecuteStringTemplate(templateName string, data interface{}) string {
	var buf bytes.Buffer

	ExecuteTemplate(templateName, data, &buf)
	return buf.String()
}
