resource "aws_instance" "tasks_app" {
  ami           = "ami-0b939c899eec68c0d" # AMI de Amazon Linux o Ubuntu
  instance_type = "t2.micro"
  key_name      = var.key_name

  tags = {
    Name = "TasksAppInstance"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update -y",
      "sudo apt-get install -y nodejs npm",
      "cd /home/ubuntu/app && npm install && npm run build",
      "pm2 start npm --name tasks-app -- start"
    ]
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file(var.private_key_path)
      host        = self.public_ip
    }
  }
}
