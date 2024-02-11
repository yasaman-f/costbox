/**
 * @swagger
 *  components:
 *      schemas:
 *          WithWhat:
 *              type: array
 *              description: In this section, the user indicates whether their income exists in cash or is on their card.
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   Cash
 *                      -   Bank
 *          Type:
 *              type: array
 *              description: In this section, we can switch money between cards, cash and saving.
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   Cash to bank
 *                      -   Bank to cash
 *                      -   Cash to Save
 *                      -   Bank to save
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddIncome:
 *              type: object
 *              required:
 *                  -   withWhat
 *                  -   howMuch
 *                  -   description
 *              properties:
 *                  withWhat:
 *                      $ref: '#/components/schemas/WithWhat'
 *                  howMuch:
 *                      type: string
 *                      description: In this section, the user enters the amount of his income
 *                  description:
 *                      type: string
 *                      description: In this section, the user can explain how to get her income
 *          SpendIncome:
 *              type: object
 *              required:
 *                  -   howMuch
 *                  -   categoryID
 *              properties:
 *                  howMuch:
 *                      type: string
 *                      description: In this section, the user can explain how to spend her income
 *                  categoryID:
 *                      type: string
 *                      description: In this section, the user chooses which category she spent her money in.
 *          Transfer:
 *              type: object
 *              required:
 *                  -   type
 *                  -   howMuch
 *              properties:
 *                  type:
 *                      $ref: '#/components/schemas/Type'
 *                  howMuch:
 *                      type: string
 *                      description: In this section, the user can specify the transfer amount between his accounts
 *
 */

/**
 * @swagger
 *  /income/addBy:
 *      post:
 *          tags: [Income]
 *          description: Add amount of income to the program
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddIncome'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddIncome'
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
 *  /income/spend:
 *      delete:
 *          tags: [Income]
 *          description: Here the user specifies how much of his income he spent and what he spent it on
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/SpendIncome'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SpendIncome'
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
 *  /income/transfer:
 *      put:
 *          tags: [Income]
 *          description: In this section, we can switch money between cards, cash and saving
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Transfer'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Transfer'
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
