/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *                  -   amountOfSpend
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for Category
 *                  description:
 *                      type: string
 *                      description: the description for Category
 *                  amountOfSpend:
 *                      type: string
 *                      description: the amountOfSpend for Category
 *                  parent:
 *                      type: string
 *                      description: the parent for Category
 *                  children:
 *                      type: string
 *                      description: the children for Category
 *          UpdateCategory:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for Category
 *                  description:
 *                      type: string
 *                      description: the description for Category
 *                  amountOfSpend:
 *                      type: string
 *                      description: the amountOfSpend for Category 
 *                  parent:
 *                      type: string
 *                      description: the maximum Consumption for Category 
 *                  children:
 *                      type: string
 *                      description: the maximum Consumption for Category 
 */


/**
 * @swagger
 *  /category/add:
 *      post:
 *          tags: [Category]
 *          description: create category
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateCategory'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateCategory'
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
 *  /category/get:
 *      get:
 *          tags: [Category]
 *          description: Get all categories
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in categories
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
 *  /category/update/{CategoryID}:
 *      put:
 *          tags: [Category]
 *          description: update category
 *          parameters:
 *              -   in: path
 *                  name: CategoryID
 *                  type: string
 *                  required: true
 *                  description: categories' id for update category
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateCategory'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateCategory'
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
 *  /category/remove/{CategoryID}:
 *      delete:
 *          tags: [Category]
 *          description: delete category
 *          parameters:
 *              -   in: path
 *                  name: CategoryID
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

