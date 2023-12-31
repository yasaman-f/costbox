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
 *  /users/add/{userID}:
 *      post:
 *          tags: [Users]
 *          description: create user
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
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


module.exports = {
    UserAuthRoutes: router
}