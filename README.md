# DevOps Assignment: Game Deployment on AWS EC2

## Overview

In this assignment, you will deploy a simple browser-based Memory Card Game to an AWS EC2 instance using Infrastructure as Code (IaC) principles. You'll use **Terraform** to provision the infrastructure and **Ansible** to configure the server and deploy the application.

## Learning Objectives

- Use Terraform to provision cloud infrastructure
- Apply Ansible for configuration management and application deployment
- Work with AWS EC2 instances
- Implement Infrastructure as Code (IaC) best practices
- Configure security groups and networking
- Deploy a web application to a cloud environment

## Prerequisites

- AWS account (use the provided educational credits)
- AWS CLI installed and configured
- Terraform installed (v1.0 or later)
- Ansible installed (v2.9 or later)
- Git for version control
- Basic understanding of Linux commands
- Node.js and npm knowledge (for understanding the application)

## The Application

The application you'll deploy is a simple Memory Card Game built with React. The game presents a grid of face-down cards, and the player must find matching pairs by flipping cards over two at a time.

## Assignment Tasks

### Part 1: Infrastructure Provisioning with Terraform

1. Review the provided Terraform configuration files in the `terraform/` directory
2. Initialize the Terraform working directory
3. Modify the variables in `terraform/terraform.tfvars` with your specific values
4. Plan and apply the Terraform configuration to create:
   - An EC2 instance (t2.micro) running Amazon Linux 2
   - Security group allowing SSH (port 22) and HTTP (port 80) traffic
   - SSH key pair for secure access
5. Note the public IP address of your EC2 instance

### Part 2: Configuration Management with Ansible

1. Review the provided Ansible playbooks in the `ansible/` directory
2. Update the `ansible/inventory.ini` file with your EC2 instance's public IP address
3. Run the Ansible playbook to:
   - Install necessary packages (Node.js, npm, Nginx)
   - Configure Nginx as a reverse proxy
   - Clone the application repository
   - Build and deploy the React application
   - Start the application services

### Part 3: Verification and Documentation

1. Access your deployed application via the EC2 instance's public IP address
2. Test the functionality of the Memory Card Game
3. Document the deployment process, including any challenges faced and solutions implemented
4. Submit your modified configuration files and documentation

## Bonus Challenges

- Add HTTPS support using Let's Encrypt
- Implement a CI/CD pipeline to automate the deployment process
- Add monitoring using CloudWatch or Prometheus
- Create an Ansible role to make the deployment more modular
- Modify the application code to add a new feature and deploy the updated version

## Grading Criteria

- **25%**: Correctly provisioned AWS infrastructure using Terraform
- **25%**: Properly configured server and deployed application using Ansible
- **20%**: Successfully running application with complete functionality
- **20%**: Documentation quality and completeness
- **10%**: Code organization and best practices

## Submission Guidelines

- Submit a ZIP file containing your project files
- Include a README.md with clear documentation
- Do not include sensitive information (e.g., AWS credentials)
- Deadline: [Your Deadline Here]

## Resources

- Terraform Documentation: [https://www.terraform.io/docs](https://www.terraform.io/docs)
- Ansible Documentation: [https://docs.ansible.com](https://docs.ansible.com)
- AWS Documentation: [https://docs.aws.amazon.com](https://docs.aws.amazon.com)
- React Documentation: [https://reactjs.org/docs](https://reactjs.org/docs)