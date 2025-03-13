# Makeup.ua Testing with WebdriverIO

## 📌 Overview
This project contains automated tests for **makeup.ua** using **WebdriverIO**.
The tests cover various UI functionalities across multiple browsers (Chrome, Firefox, Safari) in headless mode.

## 🚀 Setup and Installation
### **1. Clone the Repository**
```sh
git clone https://github.com/Lisavetti/makeup.up_testing_wdio.git
cd makeup.up_testing_wdio
```

### **2. Install Dependencies**
Make sure you have **Node.js** installed. Then run:
```sh
npm install
```

## 🧪 Running the Tests
### **1. Run tests in all browsers (Chrome, Firefox, Safari)**
```sh
npm run wdio:all
```

### **2. Run tests in a specific browser**
#### **Chrome:**
```sh
npm run wdio:chrome
```
#### **Firefox:**
```sh
npm run wdio:firefox
```
#### **Safari:**
```sh
npm run wdio:safari
```


## 🛠 WebdriverIO Configuration
The test setup is defined in `wdio.multiple.conf.js`, including:
- Headless execution mode (`--headless`)
- Parallel execution (`maxInstances` set to `2`)
- Retries enabled (`retries: 2`)
- Browser configurations (`capabilities` for Chrome, Firefox, Safari)

## 📄 Project Structure
```
makeup.up_testing_wdio/
│── test/
│   ├── specs/               # Test cases
│   ├── wdio.multiple.conf.js # WebdriverIO config for multiple browsers
│── package.json             # Project dependencies & scripts
│── README.md                # Project documentation
```

## 📌 Notes
- Ensure **ChromeDriver** and **GeckoDriver** are up to date.
- Safari requires `Enable Remote Automation` in **Safari Develop menu**.
- Use `.gitignore` to exclude unnecessary files.





