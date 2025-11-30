package mailing

import (
	"log"
	"time"

	gomail "gopkg.in/mail.v2"
)

type MailCredential struct {
	From     string
	Password string
	Port     int
	Host     string
}
type Mailer struct {
	credentials MailCredential
	ch          chan *gomail.Message
}

func Init(credentials MailCredential) *Mailer {
	ch := make(chan *gomail.Message)

	go func() {
		d := gomail.NewDialer(credentials.Host, credentials.Port, credentials.From, credentials.Password)

		var s gomail.SendCloser
		var err error
		open := false
		for {
			select {
			case m, ok := <-ch:
				if !ok {
					return
				}
				if !open {
					if s, err = d.Dial(); err != nil {
						panic(err)
					}
					open = true
				}
				if err := gomail.Send(s, m); err != nil {
					log.Print(err)
				}

			case <-time.After(30 * time.Second):
				if open {
					if err := s.Close(); err != nil {
						panic(err)
					}
					open = false
				}
			}
		}
	}()

	return &Mailer{
		credentials: credentials,
		ch:          ch,
	}
}

func (m *Mailer) SendEmail(subject string, to string, body string) {
	msg := gomail.NewMessage()
	msg.SetHeader("From", m.credentials.From)
	msg.SetHeader("To", to)
	msg.SetHeader("Subject", subject)
	msg.SetBody("text/plain", body)
	m.ch <- msg
}

func (m *Mailer) Stop() {
	close(m.ch)
}
