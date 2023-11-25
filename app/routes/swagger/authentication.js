/**
 * @swagger
 *  components:
 *      schemas:
 *          SignUp:
 *              type: object
 *              required:
 *                  -   firstName
 *                  -   lastName
 *                  -   userName
 *                  -   phoneNumber
 *                  -   email
 *                  -   password
 *              properties:
 *                  firstName:
 *                      type: string
 *                      description: the user's firstName for signup
 *                  lastName:
 *                      type: string
 *                      description: the user's lastName for signup
 *                  userName:
 *                      type: string
 *                      description: the user's userName for signup
 *                  phoneNumber:
 *                      type: string
 *                      description: the user's phoneNumber for signup
 *                  email:
 *                      type: string
 *                      description: the user's email for signup
 *                  password:
 *                      type: string
 *                      description: the user's password for signup
 *          Login:
 *              type: object
 *              required:
 *                  -   phoneNumber
 *                  -   password
 *              properties:
 *                  phoneNumber:
 *                      type: string
 *                      description: the user's phoneNumber for login
 *                  password:
 *                      type: string
 *                      description: the user's password for login
 *          Forget:
 *              type: object
 *              required:
 *                  -   phoneNumber
 *              properties:
 *                  phoneNumber:
 *                      type: string
 *                      description: the user's phoneNumber for login
 *          CheckOtp:
 *              type: object
 *              required:
 *                  -   phoneNumber
 *                  -   code
 *                  -   newPassword
 *              properties:
 *                  phoneNumber:
 *                      type: string
 *                      description: the user's phoneNumber for login
 *                  code:
 *                      type: string
 *                      description: the user's otp for login 
 *                  newPassword:
 *                      type: string
 *                      description: the user's password for login
 *          VerifyEmail:
 *              type: object
 *              required:
 *                  -   code
 *              properties:
 *                  code:
 *                      type: string
 *                      description: Get the code sent to verify the email
 */


/**
 * @swagger
 *  /user/Sign-Up:
 *      post:
 *          tags: [User-Authentication]
 *          description: sign up user with her/his information
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/SignUp'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SignUp'
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
 *  /user/verify-Email:
 *      post:
 *          tags: [User-Authentication]
 *          description: Get the code sent to verify the email
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/VerifyEmail'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/VerifyEmail'
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
 *  /user/Login:
 *      post:
 *          tags: [User-Authentication]
 *          description: login with phone number and password
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Login'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Login'
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
 *  /user/forgetPass:
 *      post:
 *          tags: [User-Authentication]
 *          description: If you forgot the password, we will send the otp code to your phone number
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Forget'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Forget'
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
 *  /user/checkOtp:
 *      post:
 *          tags: [User-Authentication]
 *          description: Here we check the entered code and if it matches, we register the new password
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOtp'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOtp'
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