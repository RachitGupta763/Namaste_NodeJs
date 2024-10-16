## DevTinder

### Create an account.
### Login.
### Update your profile.
### Feed page ->Explore.
### Send Connection Request.
### See the request we have sent/received.
### Create Dashboard


## CRUD operations

CRUD refers to the four basic operations a software application should be able to perform – Create, Read, Update, and Delete.

In such apps, users must be able to create data, have access to the data in the UI by reading the data, update or edit the data, and delete the data.

### Create 
The create operation does what the name implies. It means creating an entry. This entry could be an account, user information, a `POST`, or a task.

### Read
The READ operation means getting access to the inputs or entries in the UI. That is, seeing it. Again, the entry could be anything from user information to social media posts, and others using `GET`.

### Update
UPDATE is the operation that allows you to modify existing data. That is, editing the data.`PUT` and `PATCH` are the HTTP protocols with which you can implement an UPDATE operation, depending on what you need.

### Delete
To delete is to get rid of an entry from the UI and the database.`DELETE` is the HTTP protocol for implementing a DELETE operation.

## PUT v/s Patch

## PUT Request

A PUT request is used to update an entire resource on the server. When you use a PUT request, you are telling the server to completely replace the existing data with the new data you provide. This means that if you leave out any part of the resource, that part will be erased or set to default.

### Key Points:

`Replaces Entire Resource`: The server expects you to include all the information for the resource, even if you only want to update a small part of it.

`Can Create Resources`: If the resource doesn’t exist, a PUT request can create it because PUT specifies the exact URL where the resource should be created.

## PATCH Request

A PATCH request is used to partially update a resource. This means you only need to send the data that you want to change, without affecting the rest of the resource.

### Key Points:

`Partial Updates`: With PATCH, you only include the fields you want to update. The rest of the resource remains unchanged.

`More Efficient`: Since you’re sending less data, PATCH requests usually use less bandwidth, making them faster and more efficient.

## Routing/API

`POST` -> /signup,/login,/profile,/sendRequest,/reviewRequest.
`GET` -> /profile,/request,/connections.
`DELETE` -> /profile.
`PUT` -> /updateProfile.
`PATCH` -> /profile.

