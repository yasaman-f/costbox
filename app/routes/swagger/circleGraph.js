/**
 * @swagger
 *  components:
 *      schemas:
 *          SelectRange:
 *              type: array
 *              description: In this section, the user enters the date they want to see their pie chart
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   Today
 *                      -   This week
 *                      -   This month
 *                      -   This year
 *                      -   All time
 *                      -   Custom range
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          PieChart:
 *              type: object
 *              required:
 *                  -   range
 *              properties:
 *                  range:
 *                       $ref: '#/components/schemas/SelectRange'
 *                  fromDate:
 *                      type: string
 *                      description: the start date for return circle chart
 *                  toDate:
 *                      type: string
 *                      description: the end date for return circle chart
 */

/**
 * @swagger
 *  /analyze/pieChart:
 *      post:
 *          tags: [CircleChart]
 *          description: Here you enter the desired date and search in the section you like
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/PieChart'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PieChart'
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



