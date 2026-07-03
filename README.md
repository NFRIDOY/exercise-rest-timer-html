# Exercise Rest Timer

A sleek, offline-first web application designed to track muscle group recovery times following intense workouts. The recovery duration baselines are directly mapped using standard bodybuilding split recommendations as shown in [The Image](info/image.png).

## 📊 Recovery Data Mapping
Based on the guidelines from [The Image](info/image.png), the application tracks the following muscle groups and their mandatory rest periods:

| Muscle Group | Bengali Name | Recovery Time (Hours) | Recovery Time in Days |
| :----------- | :----------- | :-------------------- | --------------------- |
| **Chest**    | চেস্ট          | 48 Hours              | 2 days                |
| **Back**     | ব্যাক          | 72 Hours              | 3 days                |
| **Leg**      | লেগ           | 72 Hours              | 3 days                |
| **Shoulder** | সোল্ডার         | 48 Hours              | 2 days                |
| **Triceps**  | ট্রাইসেপস       | 48 Hours              | 2 days                |
| **Biceps**   | বাইসেপস        | 24 Hours              | 1 day                 |
| **Abs**      | অ্যাবস         | 24 Hours              | 1 day                 |
| **Forearms** | ফোরআর্মস       | 24 Hours              | 1 day                 |

## ✨ Features
- **Persistent Countdown State:** Uses browser `localStorage` to ensure your active timers survive page refreshes, browser crashes, or device reboots.
- **Background Time Delta Calculation:** If the browser tab is closed, the system calculates the elapsed time gap upon reopening, ensuring exact accuracy up to the second.
- **Dynamic Progress Rings:** Visual SVG arcs contract smoothly to indicate real-time recovery completion percentages.
- **Estimated Completion Badge:** Displays the precise alarm clock target time (`hh:mm AM/PM`) for when the specific muscle group will be fully recovered.

## 🚀 Getting Started
1. Go To Live Site given on the description.
2. Use the buttons to start, pause, and reset the timers after your workout. 
3. The timer will automatically reset when it reaches 0.

## Contribution Guidelines
1. Clone or download this project folder.
2. Ensure `index.html` is in the same directory structure if you plan to link assets.
3. Simply double-click `index.html` to run the application instantly in any web browser—no servers or installation required.