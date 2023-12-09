/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   title
 *                  -   minimumConsumption
 *                  -   maximumConsumption
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for Category
 *                  minimumConsumption:
 *                      type: string
 *                      description: the minimum Consumption for Category
 *                  maximumConsumption:
 *                      type: string
 *                      description: the maximum Consumption for Category
 *          UpdateCategory:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for Category
 *                  minimumConsumption:
 *                      type: string
 *                      description: the minimum Consumption for Category
 *                  maximumConsumption:
 *                      type: string
 *                      description: the maximum Consumption for Category
 */


/**
 * @swagger
 *  /category/create:
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



module.exports = {
    UserAuthRoutes: router
}