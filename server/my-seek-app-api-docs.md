# My Seek App

My Seek App is an application to look for a job. This app has :

- RESTful endpoint for asset's CRUD operation
- Google Login
- Add to favorite
- JSON formatted response

###

server: [https://seekers.mgarmayogapratama.xyz/]
client: [https://seekers-f42f0.web.app/]

&nbsp;

## RESTful endpoints

### GET /jobs

> Get Jobs and Search

_Request Header_

```
{
  Authorization: "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
    "dataJob": [
        {
            "id": "15790763928046596096",
            "application_url": "https://id.linkedin.com/jobs/view/social-media-content-intern-at-marselianggi-3806641425?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "company_name": "Marselianggi",
            "employment_type": "",
            "employment_hour_type": "",
            "plain_text_description": "MARSELIANGGI is in search of a creative and enthusiastic Social Media Content Intern to join our team. This internship offers an exciting opportunity to contribute to the creation of engaging content for our social media platforms. If you have a passion for fashion, proficiency in graphic design, and are based in Jakarta or Jabodetabek, we would love to hear from you. Responsibilities • Content Creation: Develop visually captivating and on-brand content for social media platforms, with a focus on Instagram and TikTok. • Photography and Editing: Capture and edit high-quality images and videos using graphic design programs (Adobe Photoshop, Adobe Illustrator, etc.) to enhance the visual appeal of social media posts. • Campaign Support: Collaborate in the planning and execution of social media campaigns to promote new collections, events, and brand initiatives. • Analytics and Reporting: Monitor social media performance using analytics tools, providing regular reports on key metrics and... suggesting improvements based on data. Qualifications • Proficiency in Graphic Design: Proficiency in using design programs (Adobe Photoshop, Adobe Illustrator, etc.) for creating visually appealing content. • Location: Based in Jakarta or Jabodetabek. • Fashion Enthusiast: Keen interest and understanding of the fashion industry and current trends. • Communication Skills: Excellent written and verbal communication skills. Proficiency in English is a plus. • Collaborative Spirit: Ability to work collaboratively in a team environment. • Currently Enrolled or Recent Graduate: Current enrollment in a relevant degree program (Marketing, Communications, Fashion, etc.) or recent graduate (SMA/SMK/D3/S1",
            "html_description": "<p>MARSELIANGGI is in search of a creative and enthusiastic Social Media Content Intern to join our team. This internship offers an exciting opportunity to contribute to the creation of engaging content for our social media platforms. If you have a passion for fashion, proficiency in graphic design, and are based in Jakarta or Jabodetabek, we would love to hear from you. Responsibilities • Content Creation: Develop visually captivating and on-brand content for social media platforms, with a focus on Instagram and TikTok. • Photography and Editing: Capture and edit high-quality images and videos using graphic design programs (Adobe Photoshop, Adobe Illustrator, etc.) to enhance the visual appeal of social media posts. • Campaign Support: Collaborate in the planning and execution of social media campaigns to promote new collections, events, and brand initiatives. • Analytics and Reporting: Monitor social media performance using analytics tools, providing regular reports on key metrics and... suggesting improvements based on data. Qualifications • Proficiency in Graphic Design: Proficiency in using design programs (Adobe Photoshop, Adobe Illustrator, etc.) for creating visually appealing content. • Location: Based in Jakarta or Jabodetabek. • Fashion Enthusiast: Keen interest and understanding of the fashion industry and current trends. • Communication Skills: Excellent written and verbal communication skills. Proficiency in English is a plus. • Collaborative Spirit: Ability to work collaboratively in a team environment. • Currently Enrolled or Recent Graduate: Current enrollment in a relevant degree program (Marketing, Communications, Fashion, etc.) or recent graduate (SMA/SMK/D3/S1)</p>",
            "publication_time": "2024-01-18T14:10:52Z",
            "source": "melalui LinkedIn",
            "title": "Social Media Content Intern",
            "location": "Jakarta, Daerah Khusus Ibukota Jakarta",
            "salary": null
        },
        ...
    ]
}
```

_Response (401 - Unauthorized)_

```
{
  "message": "Invalid User"
}
```

---

### POST /users/register

> Create new User

_Request Header_

```

not needed

```

_Request Body_

```

{
"username": string,
"email": string,
"password": string,
"gender": string,
}

```

_Response (201 - Created)_

```

{
    "message": "success create new user",
    "user": {
        "id": 4,
        "username": "user4",
        "email": "user4@mail.com",
        "gender": "Female",
        "member": "Standard",
        "createdAt": "2024-01-18T14:15:35.111Z",
        "updatedAt": "2024-01-18T14:15:35.111Z"
    }
}

```

_Response (400 - Bad Request)_

```

{
"message": [ "username is required" ]
OR
"message": [ "email is required" ]
OR
"message:: ["email has been used. Email must be unique"]
OR
"message:: ["email must be email format"]
OR
"message": [ "password is required" ]
OR
"message:: ["password must be minimum 8 characters"]
OR
"message": [ "gender is required" ]
}

```

### POST /users/login

> Post login User

_Request Header_

```

not needed

```

_Request Params_

```

not needed

```

_Request Body_

```

{
"email": string,
"password": string,
}

```

_Response (200 - OK)_

```

{
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA1NTg3OTU3fQ.v4NLPzw0oIqogGa4C72A9jQHeZWv7diUhfGANaD8bRU"
}

```

_Response (400 - Bad Request)_

```

{
  "message: "Email/Password can not be empty"
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Invalid User"
}

```

### GET /users

> Get Users

_Request Header_

```

{
Authorization: "<your access token>"
}

```

_Request Params_

```

not needed

```

_Request Body_

```

not needed

```

_Response (200 - OK)_

```

{
    "users": [
        {
            "id": 1,
            "username": "user1",
            "email": "user1@mail.com",
            "password": "$2a$10$xegmoxoNnERvkN5C66wtbOCehkgKhglKZtAwe9IET9JcPcKeJRFcK",
            "gender": "Male",
            "member": "Premium",
            "createdAt": "2024-01-18T11:25:57.273Z",
            "updatedAt": "2024-01-18T11:25:57.273Z"
        },
        ...
    ]
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Invalid User"
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Token which you input is invalid Token"
}

```

### GET /users/:id

> Get user by id

_Request Header_

```

{
Authorization: "<your access token>"
}

```

_Request Params_

```

{
id: integer (required)
}

```

_Request Body_

```

not needed

```

_Response (200 - OK)_

```

{
    "user": {
        "id": 1,
        "username": "user1",
        "email": "user1@mail.com",
        "password": "$2a$10$xegmoxoNnERvkN5C66wtbOCehkgKhglKZtAwe9IET9JcPcKeJRFcK",
        "gender": "Male",
        "member": "Premium",
        "createdAt": "2024-01-18T11:25:57.273Z",
        "updatedAt": "2024-01-18T11:25:57.273Z"
    }
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Invalid User"
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Token which you input is invalid Token"
}

```

_Response (404 - Not Found)_

```

{
"message": "Data not found"
}

```

### GET /profiles/:id/detail

> GET profile by id

_Request Header_

```

{
Authorization: "<your access token>"
}

```

_Request Params_

```

{
id: integer (required)
}

```

_Request Body_

```

not needed

```

_Response (200 - OK)_

```

{
    "message": "success get Profile by Id",
    "profile": {
        "id": 1,
        "fullName": "user 1",
        "username": "user1",
        "email": "user1@mail.com",
        "gender": "Male",
        "member": "Premium",
        "address": "Jl. 1",
        "image": "https://res.cloudinary.com/daz8ay876/image/upload/v1705584538/my-job-seeker/_29ba4c31-79a2-44e1-b522-1a8ef0592f81.jpeg.jpg",
        "UserId": 1,
        "createdAt": "2024-01-18T13:25:44.707Z",
        "updatedAt": "2024-01-18T13:28:59.632Z"
    }
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Invalid User"
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Token which you input is invalid Token"
}

```

_Response (404 - Not Found)_

```

{
"message": "Data not found"
}

```

### POST /profiles/:id/new-profile

> Create new profile by id

_Request Header_

```

{
"Authorization": "<your access token>"
}

```

_Request Body_

```

{
"fullName": string,
"address": string,
}

```

_Response (200)_

```

{
  "message": "success get all Profile",
  "profile": {
      "id": 2,
      "fullName": "User 2",
      "username": "user2,
      "email: "user2@mail.com",
      "gender": "Female",
      "member: "Standard",
      "address": "Jl. 2"
  }
}

```

_Response (400 - Bad Request)_

```

{
"message": [ "fullname is required" ]
OR
"message": [ "username is required" ]
OR
"message": [ "email is required" ]
OR
"message:: ["email has been used. Email must be unique"]
OR
"message:: ["email must be email format"]
OR
"message": [ "password is required" ]
OR
"message:: ["password must be minimum 8 characters"]
OR
"message": [ "gender is required" ]
OR
"message": [ "gender must be Male or Female" ]
OR
"message": [ "address is required" ]
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Invalid User"
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Token which you input is invalid Token"
}

```

_Response (404 - Not Found)_

```

{
"message": "Data not found"
}

```

---

### UPDATE /profiles/:id/update

> Update profile by id

_Request Header_

```

{
"Authorization": "<your access token>"
}

```

_Request Body_

```

{
"fullName": string,
"username: string,
"gender: string,
"address": string,
}

```

_Response (200)_

```

{ message: "success update Profile" }

```

_Response (400 - Bad Request)_

```

{
"message": [ "fullname is required" ]
OR
"message": [ "username is required" ]
OR
"message": [ "email is required" ]
OR
"message:: ["email has been used. Email must be unique"]
OR
"message:: ["email must be email format"]
OR
"message": [ "password is required" ]
OR
"message:: ["password must be minimum 8 characters"]
OR
"message": [ "gender is required" ]
OR
"message": [ "gender must be Male or Female" ]
OR
"message": [ "address is required" ]
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Invalid User"
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Token which you input is invalid Token"
}

```

_Response (404 - Not Found)_

```

{
"message": "Data not found"
}

```

---

### PATCH /profiles/:id/update-profile-image

> Update image profile by id

_Request Header_

```

{
"Authorization": "<your access token>"
}

```

_Request Body_

```

{
"image": <form-data>
}

```

_Response (200)_

```

{ message: "success update image Profile" }

```

_Response (400 - Bad Request)_

```

{
"message": [ "image is required" ]
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Invalid User"
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Token which you input is invalid Token"
}

```

_Response (404 - Not Found)_

```

{
"message": "Data not found"
}

```

---

### GET /my-jobs

> Get My Jobs

_Request Header_

```

{
"Authorization": "<your access token>"
}

```

_Request Body_

```

not needed

```

_Response (201 - Created)_

```

{
    "message": "success get all MyJob",
    "myJobs": [
        {
            "id": 1,
            "applicationUrl": "https://id.linkedin.com/jobs/view/senior-web-developer-at-kelas-pintar-3804170617?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "companyName": "Kelas Pintar",
            "jobDescription": "Responsibilities: • Meeting with the development team to discuss user interface ideas and applications; • Reviewing application requirements and interface designs. • Identifying web-based user interactions; • Developing and implementing highly responsive user interface components using react concepts; • Have experience in the field development using React JS • Proficient understanding of HTML, Javascript, CSS, PHP, Zend Framework • Troubleshooting interface software and debugging application codes; • Developing and implementing front-end architecture to support user interface concepts; • Experience in integration with third-party, web RTC, or build streaming app is a plus; • Understand versioning like Git or Gitlab; • Familiar with slicing from Figma tools. Minimum Qualifications: • Bachelor’s degree in computer science, information technology, or a similar field. • 3 years proven experiences working as developer. • In-depth knowledge of Javascript, CSS, HTML, and front-end... languages. • Knowledge of REACT tools including ReactJS. • Experience with user interface design. • Good understanding of the state management, such as Redux or Zustand. • Experience with browser-based debugging and performance testing software. • Excellent troubleshooting skills. • Good project management skills",
            "publicationTime": "2024-01-18",
            "source": "melalui LinkedIn",
            "title": "Senior Web Developer",
            "UserId": 1,
            "createdAt": "2024-01-18T11:27:17.816Z",
            "updatedAt": "2024-01-18T11:27:17.816Z"
        },
        {
            "id": 2,
            "applicationUrl": "https://id.linkedin.com/jobs/view/backend-software-engineer-at-jj-3803650029?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            "companyName": "JJ",
            "jobDescription": "Summary: Are you ready to join the JJ team and help build the ultimate advertising marketplace, revolutionizing how people use advertising? At JJ, we're on a mission to become a trusted global advertising marketplace, committed to providing value to our customers every step of the way. Join us in shaping this thrilling journey where your contribution will be invaluable to our success! Who You Are: Join us as a Back-End Engineer, where you'll be the tech maestro behind the scenes, crafting the core of our applications. Your realm? Server-side magic with Python, Ruby, or Java, and building robust databases. You'll solve complex challenges, optimize for efficiency, and innovate for impact. Expect competitive pay and a role where your code defines the future. If you're ready to take on this crucial role, we're excited to see your application. What You’ll Do: • Collaborate on building and operating services at scale, ensuring seamless performance for concurrent audiences of millions. •... Iteratively improve end-to-end website quality and performance • Develop and maintain server-side logic. • Ensure high performance and responsiveness to front-end requests. • Write clean, scalable, and maintainable code. • Design and implement data storage solutions. • Integrate user-facing elements developed by front-end developers with server-side logic. • Optimize the application for maximum speed and scalability. • Implement security and data protection measures. • Design and implement efficient, reusable, and reliable code. • Troubleshoot, debug, and upgrade existing systems. Qualifications: • Proven experience in building and operating services at scale. • In-depth knowledge and experience with media processing pipelines in C/C++. • Extensive experience ensuring end-to-end media quality and performance. • Proficiency in server-side languages such as Python, Ruby, Java, and PHP. • Knowledge of database technologies like MySQL, MongoDB, and Oracle. • Understanding of code versioning tools, such as Git. • Familiarity with development aiding tools. • Experience with user authentication and authorization between multiple systems, servers, and environments. • Understanding of fundamental design principles for building a scalable application. • Ability to create database schemas that represent and support business processes. • Strong problem solving and analytical skills. Education & Experience: • Proven experience in building and operating services at scale. • Bachelor’s degree in Computer Science or related field. Additional Information: • Location: Primarily based in East Jakarta (Onsite) • Diversity and Inclusion: We are committed to creating a diverse and inclusive workplace. Candidates from all backgrounds are encouraged to apply. Join our small team and shape the new advertising experience. If you thrive in a dynamic, high-growth tech environment and relish the opportunity to collaborate with passionate, driven over-achievers, your career with us here at JJ will be both exhilarating and fulfilling",
            "publicationTime": "2024-01-18",
            "source": "melalui LinkedIn",
            "title": "Backend Software Engineer",
            "UserId": 1,
            "createdAt": "2024-01-18T11:32:05.970Z",
            "updatedAt": "2024-01-18T11:32:05.970Z"
        }
    ]
}

```

### DELETE /my-jobs/:id/delete

> Delete My Job by id

_Request Header_

```

{
Authorization: "<your access token>"
}

```

_Request Params_

```

{
id: integer (required)
}

```

_Request Body_

```

not needed

```

_Response (200 - OK)_

```

{ message: "success deleted MyJob" }

```

_Response (401 - Unauthorized)_

```

{
"message": "Invalid User"
}

```

_Response (401 - Unauthorized)_

```

{
"message": "Token which you input is invalid Token"
}

```

_Response (404 - Not Found)_

```

{
"message": "Data not found"
}

```

---

### Globar Error

_Response (500 - Internal server error)_

```

{
"message": "Internal server error"
}

```

```

```

```

```

```

```
