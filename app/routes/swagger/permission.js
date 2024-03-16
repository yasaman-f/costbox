/**
 * @swagger
 *  definitions:
 *      ListOfPermissions:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      permissions:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of permission"
 *                                  description:
 *                                      type: string
 *                                      example: "desc of permission"
 *                                          
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Permission:
 *              type: object
 *              required:
 *                  -   name
 *                  -   description
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the title of permission
 *                  description:
 *                      type: string
 *                      description: the describe of permission
 *          Edit-Permission:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the title of permission
 *                  description:
 *                      type: string
 *                      description: the desc of permission
 */

/**
 * @swagger
 *  /admin/permissions/list:
 *      get:
 *          tags: [RBAC]
 *          summary: get all Permissions    
 *          responses:
 *              200:
 *                  description: get all permissions
 * 
 */

/**
 * @swagger
 *  /admin/permissions/add:
 *      post:
 *          tags: [RBAC]
 *          summary: create new Permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Permission'
 *          
 *          responses:
 *              201:
 *                  description: created new Permission
 * 
 */

/**
 * @swagger
 *  /admin/permissions/update/{id}:
 *      patch:
 *          tags: [RBAC]
 *          summary: edit the Permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Permission'
 *          
 *          responses:
 *              200:
 *                  description: edit the Permission
 * 
 */

/**
 * @swagger
 *  /admin/permissions/remove/{id}:
 *      delete:
 *          tags: [RBAC]
 *          summary: remove the Permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true        
 *          responses:
 *              200:
 *                  description: removed the Permission
 * 
 */