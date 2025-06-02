# Multiapp.exe - IT Management Tool Suite

![Multiapp Logo](/Multiapp-Logo.png)

## Overview

**Multiapp** is a comprehensive IT management tool designed specifically for IT support departments. This powerful application combines 51 different utilities into a single executable file, streamlining various IT tasks from system monitoring to file management, network diagnostics, and more.

## Technology Stack

- **Programming Languages**: Python and C++
- **Deployment**: Precompiled into a single executable file
- **Architecture**: 64-bit Windows applications

## System Requirements

### Minimum Requirements
- **Operating System**: Windows 10 (x64)
- **Processor**: 1-2 GHz
- **RAM**: 4 GB
- **Disk Space**: 300 MB free space for installation and operation
- **Internet Connection**: Recommended for network functionalities

### Display Requirements
- **Screen Resolution**: 100% zoom recommended (especially for laptops)
- For optimal display, configure DPI settings: Right-click Multiapp.exe → Properties → Change settings for all users → Change high DPI settings

## Authentication System

### Public Accounts
- Stored in `Accounts.txt` file
- Special accounts available:
  - **user/nopass**: For file copying operations only
  - **passgen/passgen** & **passgenV2/passgenV2**: Password generation utilities

### Developer Accounts
- Reserved for development purposes
- Not accessible to end users

## Core Features

### 1. File Management Tools
- **Explorer Mode**: Dynamic local file/folder copying with path saving
- **Copy App**: Network file copying from servers to `C:\KIT` directory
- **Create/Extract Zip**: Archive management with selective extraction
- **File Organizer**: Automatic file categorization
- **Rename Utility**: Batch file renaming operations
- **Backup Utility**: Data backup for sensitive information

### 2. Network & System Diagnostics
- **Get IP & MAC**: Display network adapter information
- **Port Scanner**: Scan open ports on network devices
- **Ping Tool**: Network connectivity testing with port discovery
- **Network Console**: Comprehensive network monitoring and Wi-Fi password recovery
- **Network Bandwidth Monitoring**: Real-time network usage graphs
- **Listener**: Monitor online/offline status of network devices

### 3. System Monitoring & Information
- **System Info**: Comprehensive system information with domain joining capabilities
- **Real-time System Information**: Live system performance monitoring
- **Hardware Monitor Lite**: CPU, RAM, disk, and GPU monitoring
- **Task Manager**: Process management with memory and network usage
- **Alert Monitor**: System alerts based on usage thresholds
- **Event Viewer**: System log analysis (errors, warnings, information)
- **Process Viewer**: CPU and GPU usage by core

### 4. Development & Productivity Tools
- **Advanced Notepad**: Notepad++ clone for quick note-taking
- **Python IDE**: Full Python development environment
- **SQL Explorer**: SQLite database editor and query executor
- **XML Editor**: Configuration file editing
- **Text Editor**: Advanced text editing capabilities
- **Find & Replace**: Advanced text search and replacement

### 5. Office & Document Tools
- **PDF to Word**: Convert PDF files with image extraction
- **PDF Tools**: Encryption, image extraction, page manipulation
- **Excel Lite**: Spreadsheet application with formula support
- **Office Reader**: View .docx, .xlsx, .pptx files
- **Equipment Sheet**: Excel file viewer without Office installation

### 6. Security & Privacy Tools
- **File Encryption**: High-complexity encryption algorithms
- **Password Manager**: Encrypted password database
- **Cracking ZIP Passwords**: Password recovery for ZIP archives
- **Password Generation**: Secure password creation utilities

### 7. Multimedia & Graphics
- **Screen Events**: Screen recording and screenshot capabilities
- **Whiteboard**: Digital drawing and diagramming tool
- **Whiteboard Presentation**: Interactive presentation tool with image import
- **Diagram Editor**: Professional diagram creation

### 8. Utilities & Miscellaneous
- **Comparator**: File and folder comparison tool
- **Testing**: Quiz creation with multiple-choice questions
- **Contact Manager**: Contact information database
- **Calendar**: Event scheduling and management
- **Pause Manager**: Team break management system
- **Terminal Emulator**: CMD and Linux interface simulation
- **Retro Commander**: Total Commander clone
- **AI Chatbot**: Virtual assistant (99% Romanian language support)

## Installation & Setup

1. Download the `Multiapp.exe` file
2. Ensure your system meets the minimum requirements
3. Configure display settings for optimal viewing
4. Run the application and log in using provided accounts

## Configuration Files

- **Accounts.txt**: User account information
- **paths.txt**: Network paths for Copy App
- **profiles.json**: Equipment profiles for Copy App
- **ChooseLocationForPause.txt**: Pause Manager file location
- **Config folder**: XML configuration files

## Performance Benefits

- **Efficiency**: 18.8% ~ 20% faster copying compared to traditional methods
- **Optimization**: Precompiled paths and direct bit allocation
- **Integration**: All tools unified in a single application

## Network Features

- VLAN and LAN device monitoring
- Network packet analysis
- Wi-Fi password recovery
- Real-time bandwidth monitoring
- Device connectivity status tracking

## Security Features

- Multi-level authentication system
- Encrypted password storage
- Secure file encryption
- Access control for sensitive operations
- Terminal access restrictions based on security policies

## Repair & Maintenance

### Automatic Repair (Fetcher)
Use the **Fetcher - Repair Setup** feature for automatic error correction and file restoration.

### Manual Repair (Shell Integrator)
Execute the following commands in sequence:
1. `init`
2. `powercli Multiapp.exe -t`
3. `getscan register mov eax, eay: shell True`
4. `1/0,12`
5. `0/0,8`
6. `start,1/0/0`
7. `restart_service`
8. `X/1,0`
9. `X/1,1`
10. `CLI/1/0/0,t`
11. `cfg,0/0/1` (use `init` for Windows 10 if this fails)
12. `launch_multiapp`

## Support & Documentation

- **Knowledge Base**: Built-in local documentation platform
- **AI Chatbot**: Integrated virtual assistant
- **Read Me First**: Essential usage information
- **Equipment Sheets**: Hardware configuration templates

## Licensing

© 2024 Muap - Knowledge Base

---

**Note**: This application is designed for professional IT environments and includes advanced network and system management capabilities. Some features may require administrative privileges or specific network permissions.

For technical support or additional configuration assistance, consult the built-in Knowledge Base or contact your IT administrator.
