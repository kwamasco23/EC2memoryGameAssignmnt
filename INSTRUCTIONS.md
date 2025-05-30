# DevOps Task Instructions

## Task Overview

You will deploy a Memory Card Game to an AWS EC2 instance using Terraform for infrastructure provisioning and Ansible for configuration management.

## Step-by-Step Guide

### 1. Project Setup

1. Clone the starter repository:
   ```bash
   git clone https://github.com/GyeeTech/devops-memory-game-assignment.git
   cd devops-memory-game-assignment
   ```

   Note: Your instructor will provide you with the actual repository URL.

2. Review the project structure to understand the components:
   - `/src` - React application (Memory Card Game)
   - `/terraform` - Infrastructure as Code configuration
   - `/ansible` - Configuration management playbooks

### 2. AWS Setup

1. Create an AWS account if you don't have one
2. Install and configure the AWS CLI
   ```bash
   aws configure
   ```
3. Generate an SSH key pair for EC2 access
   ```bash
   ssh-keygen -t rsa -b 2048 -f ~/.ssh/ec2_key
   ```

### 3. Terraform Deployment

1. Initialize the Terraform working directory
   ```bash
   cd terraform
   terraform init
   ```

2. Update the `terraform.tfvars` file with your settings
   - Update the `public_key_path` to point to your SSH public key
   - Ensure the AMI ID is appropriate for your region

3. Plan the infrastructure deployment
   ```bash
   terraform plan
   ```

4. Apply the Terraform configuration to create AWS resources
   ```bash
   terraform apply
   ```

5. Note the EC2 public IP address from the output

### 4. Ansible Configuration

1. Update the Ansible inventory file with your EC2 instance
   ```bash
   cd ../ansible
   ```
   Edit `inventory.ini` to include your EC2 public IP address

2. Ensure your SSH key has the correct permissions
   ```bash
   chmod 400 ~/.ssh/ec2_key
   ```

3. Run the Ansible playbook to configure the server and deploy the application
   ```bash
   ansible-playbook -i inventory.ini playbook.yml
   ```

### 5. Verification

1. Open a web browser and navigate to your EC2 instance's public IP address
   ```
   http://<your-ec2-public-ip>
   ```

2. Test the Memory Card Game to ensure it's working correctly

### 6. Documentation

Create documentation that includes:
- A description of the architecture
- Steps you followed to deploy the application
- Any challenges you encountered and how you resolved them
- Screenshots of the deployed application
- Suggestions for improvements

## Submission

Submit a zip file containing:
1. Your modified terraform configurations
2. Your modified ansible files
3. Documentation of your deployment
4. (Optional) Any improvements you made to the application or deployment process

## Grading Criteria

- **Terraform Configuration (25%)**
  - Proper resource creation
  - Security considerations
  - Effective use of variables

- **Ansible Playbook (25%)**
  - Server configuration
  - Application deployment
  - Error handling

- **Application Functionality (20%)**
  - Game runs correctly
  - No console errors
  - Responsive design

- **Documentation (20%)**
  - Clear explanation of steps
  - Architecture diagram
  - Troubleshooting notes

- **Best Practices (10%)**
  - Code organization
  - Security considerations
  - Resource tagging
