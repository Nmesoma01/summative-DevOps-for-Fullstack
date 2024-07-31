terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"  # Adjust version as needed
    }
  }

  required_version = ">= 1.0"
}

provider "digitalocean" {
  token = var.digitalocean_token
}

resource "digitalocean_droplet" "example" {
  name   = "example-droplet"
  image  = "ubuntu-20-04-x64"
  size   = "s-1vcpu-1gb"
  region = "nyc3"
}

variable "digitalocean_token" {
  description = "The token for DigitalOcean API"
  type        = string
}
