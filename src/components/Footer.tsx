import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-lg font-semibold gradient-text">
              Sarunya Portfolio
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/Sarunyamk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/sarunya-vajapattana-7b5a33339"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sarunya46mk@gmail.com"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
