/**
 * @swagger
 *  components:
 *      schemas:
 *          TypE:
 *              type: array
 *              description: In this section, you choose which part of history I will return to you
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   Total history
 *                      -   Income history
 *                      -   Spend history
 *                      -   Transfer history
 *                      -   Save history
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          CheckHistory:
 *              type: object
 *              required:
 *                  -   fromDate
 *                  -   toDate
 *                  -   type
 *              properties:
 *                  fromDate:
 *                      type: string
 *                      description: the title for Category
 *                  toDate:
 *                      type: string
 *                      description: the description for Category
 *                  type:
 *                       $ref: '#/components/schemas/TypE'
 */

/**
 * @swagger
 *  /history/search:
 *      post:
 *          tags: [History]
 *          description: Here you enter the desired date and search in the section you like
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckHistory'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckHistory'
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



