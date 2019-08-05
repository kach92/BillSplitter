# BillSplitter
A Bill Splitting Web App

![ALT TEXT](https://res.cloudinary.com/kach92/image/upload/v1564994560/Blitt_zddb0w.png)

## Objective
The app aims to ease users from the trouble of keeping record on how much they owe or owed on bills that are paid by themselves or others.

## Functions
- create and add new bill easily, with functions to automatically help user split the bill equally or user can input it manually for unequal splitting.
- create group with only people you associated with for different situations to better plan your financial.
- easily check how much you owe or how much others you through the group list or friend list page.
- calculations will be done whenver you settle the total amount with someone.
- a bar graph and line graph to show your past 30 days expenses, amount you borrowed or amount you lent, by category or daily expenses.

## Technologies Used
- Front-end
 - HTML, CSS, Javascript
- Backend
 - NodeJS, ExpressJS, React
- Database
 - PostgreSQL
- Others
 - ChartJS, Cloudinary, QR code API

## Approach Taken and Function Explanation

### Approach
I started by planning the functions that I want my app to have eg. create group and add multiple friends, trace all debts by group or by friend list, each group and each list will also list out the individual owings etc. Then I proceed to plan my tables for my database, start creating layouts and creating functionality from start eg. login/logout, adding bills up to the end eg. owings calculations, activity log, editing and deleting bills.

I used 7 tables for different functionality, but among them is 2 tables which is used for calculation. The purpose to have 2 tables is because for 1 table used it to keep a record of owings between users, while another table I use it to keep track of amount splitted for each user for each bill, which I can use for calculating personal expenses for each user later on. Other tables are basic tables such as users, bills, groups and also an activity group for checking logs.

### Functions
My groups and friend list are made so that in group list, user can see each group they are involved in, and each group card will show the amount the user owe or owed, as well as owings from individual members in that group. Same for friend list, user can see each friend card with total owing amount, as well as owings from different groups that both of you are associated with.

Users can add, edit and delete bill. The bill list can be seen when clicked into individual group, with each bill card categorized with different color and symbols based on their category. Upon clicking into a bill user can also checked the who paid the bill, as well as the amount each individual need to pay to the payer. Any settled debt by user or others will be shown with a label (paid) beside their owings. User can also edit or delete bill, only if no one has settled the bill before.

Users can also choose to settle the final amount either by group (selecting who to settle with in individual group) or straight away settle with another user of the total amount owed in all groups. Upon confirming the settle, calculations will be done so that user will see an updated owings in the group and friend list page. User can also click a qr button to generate a qr code for the user's phone number of the person they want to pay to.

Users can check their past 30 days expenses at the main profile page. The result will be shown either in bar form or line form, where the line chart is expenses by day, and bar chart is expenses by category. The user can also see a total of his expenses in number, amount borrowed as well as amount lent.

Users can also check the activitiy log for any recent updates. Users can only see logs that are exclusive to them. The log is also dynamic in the sense that it will now it is "you" if you are the user instead of using your name. Any adding bill, creating group, editing bill, deleting bill and settling bill action will be logged.

## Unsolved Problems
So far I am still tracing for bugs in the app as money calculations are very sensitive and bugs are hard to trace. There are also few more functions that I will like to implement later on such as a proper profile page for user to change their personal details, and also a add friend system. Another unsolvable issue would be when the owing is 0, the app supposed to show no owings but it will show "You owe 0.00" instead, this is some issue when doing calculation using parseFloat and toFixed. Will continue to see how to solve this.

