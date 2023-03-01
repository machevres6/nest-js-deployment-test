# Data Models

## Author

| Property | Type | Description |
| :--- | :--- | :--- |
| `authorId` | `string` | The author's unique identifier (uudi) | 
| `name` | `string` | The author's name |
| `email` | `string` | The author's email address |
| `hashedPassword` | `string` | The author's password |
| `articles` | `array` | articles written by the authorId |

## Article

| Property | Type | Description |
| :--- | :--- | :--- |
| `articleId` | `string` | The article's unique identifier (uuid) |
| `title` | `string` | The article's title |
| `description` | `string` | The article's description |
| `body` | `string` | The article's body |
| `published` | `boolean` | The article's published status |
| `createdAt` | `string` | The article's creation date |
| `updatedAt` | `string` | The article's last update date |
| `authorEmail` | `string` | The article's author's email address |