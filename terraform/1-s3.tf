# 0-main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.45.0"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
}

# 1-s3.tf
data "aws_s3_bucket" "existing_tasks_app" {
  bucket = "tasks-app-alvarorivas"
}

resource "aws_s3_bucket_website_configuration" "react-confg" {
  bucket = data.aws_s3_bucket.existing_tasks_app.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_ownership_controls" "bucket-ownership" {
  bucket = data.aws_s3_bucket.existing_tasks_app.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "bucket-public-access" {
  bucket = data.aws_s3_bucket.existing_tasks_app.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "bucket-acl" {
  bucket = data.aws_s3_bucket.existing_tasks_app.id
  acl    = "public-read"

  depends_on = [
    aws_s3_bucket_ownership_controls.bucket-ownership,
    aws_s3_bucket_public_access_block.bucket-public-access
  ]
}
