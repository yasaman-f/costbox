/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateUser:
 *              type: object
 *              required:
 *                  -   firstName
 *                  -   lastName
 *                  -   userName
 *                  -   phoneNumber
 *                  -   email
 *              properties:
 *                  firstName:
 *                      type: string
 *                      description: user's first name
 *                  lastName:
 *                      type: string
 *                      description: user's last name
 *                  userName:
 *                      type: string
 *                      description: user's user name
 *                  phoneNumber:
 *                      type: string
 *                      description: user's phone number
 *                  email:
 *                      type: string
 *                      description: user's email
 *                  profile: 
 *                      type: string 
 *                      format: binary
 */


/**
 * @swagger
 *  /users/add:
 *      post:
 *          tags: [Users]
 *          description: create user
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateUser'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateUser'
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */


/**
 * @swagger
 *  /users/get:
 *      get:
 *          tags: [Users]
 *          description: Get all users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search user
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */

/**
 * @swagger
 *  /users/userHome:
 *      get:
 *          tags: [Users]
 *          description: user page
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */


/**
 * @swagger
 *  /users/removeByAdmin/{userID}:
 *      delete:
 *          tags: [Users]
 *          description: delete user by owner
 *          parameters:
 *              -   in: path
 *                  name: userID
 *                  type: string
 *                  description: objectId of product
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */

/**
 * @swagger
 *  /users/removeUser:
 *      delete:
 *          tags: [Users]
 *          description: delete user 
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */

module.exports = {
    UserAuthRoutes: router
}