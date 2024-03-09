/**
 * @swagger
 *  components:
 *      schemas:
 *          Kind:
 *              type: array
 *              description: In this section, the user chooses whether the specified date corresponds to the debtor or creditor.
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   Debtor
 *                      -   Creditor
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddSetTime:
 *              type: object
 *              required:
 *                  -   type
 *                  -   startDate
 *                  -   endDate
 *                  -   when
 *                  -   description
 *              properties:
 *                  type:
 *                      $ref: '#/components/schemas/Kind'
 *                  startDate:
 *                      type: string
 *                      description: The user chooses the start time for event
 *                  endDate:
 *                      type: string
 *                      description: The user chooses the end time for event
 *                  when:
 *                      type: string
 *                      description: The user determines the date and time of the event
 *                  description:
 *                      type: string
 *                      description: The user enters the event description here
*/

/**
 * @swagger
 *  /setTime/addSetTime:
 *      post:
 *          tags: [Set-Time]
 *          description: In this section, we will add an event to Google Calendar using the information provided by the user
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddSetTime'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddSetTime'
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

