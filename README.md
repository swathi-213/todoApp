# Todo Task Management Mobile App

A cross-platform (Android) Todo Task Management Mobile App built with Expo and React Native for the Katomaran hackathon.

## Features
- Add, view, complete, and delete tasks
- Task fields: title, description, due date, status, priority
- Local storage (AsyncStorage)
- Basic navigation (no authentication yet)
- Pull-to-refresh and no-data state

## Setup Instructions
1. Clone this repository
2. Run `npm install`
3. Run `npx expo start` and scan the QR code with Expo Go (Android)

## Assumptions
- Only Android is supported (as per instructions)
- No authentication or backend yet (per staged development)
- No UI polish or extra features beyond requirements
- All data is stored locally on the device

# Troubleshooting

If you encounter errors about missing TaskListScreen or TaskFormScreen, ensure that the imports in App.js reference './TaskListScreen' and './TaskFormScreen' (not './screens/TaskListScreen').

