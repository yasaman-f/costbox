/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of role"
 *                                  description:
 *                                      type: string
 *                                      example: "desc of role"
 *                                  permission:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  example: "62822e4ff68cdded54aa928d"
 *                                              title:
 *                                                  type: string
 *                                                  example: "title of permission"
 *                                              description:
 *                                                  type: string
 *                                                  example: "describe the permission"
 *                                          
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the desc of role
 *                  permissions:
 *                      type: array
 *                      description: the permissionsID for role
 *          Edit-Role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the desc of role
 *                  permissions:
 *                      type: array
 *                      description: the permissionsID for role
 *          Give-Role:
 *              type: object
 *              required:
 *                  -   userID
 *                  -   roleID
 *              properties:
 *                  userID:
 *                      type: string
 *                      description: the userID
 *                  roleID:
 *                      type: string
 *                      description: the roleID
 */

/**
 * @swagger
 *  /admin/roles/list:
 *      get:
 *          tags: [RBAC]
 *          summary: get all Role      
 *          responses:
 *              200:
 *                  description: get all Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfRoles'
 * 
 */

/**
 * @swagger
 *  /admin/roles/add:
 *      post:
 *          tags: [RBAC]
 *          summary: create new Role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
 *          
 *          responses:
 *              201:
 *                  description: created new Role
 * 
 */

/**
 * @swagger
 *  /admin/roles/giveRole:
 *      post:
 *          tags: [RBAC]
 *          summary: give role to special user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Give-Role'
 *          
 *          responses:
 *              201:
 *                  description: give role to special user
 * 
 */

/**
 * @swagger
 *  /admin/roles/update/{id}:
 *      patch:
 *          tags: [RBAC]
 *          summary: edit the Role
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
 *                          $ref: '#/components/schemas/Edit-Role'
 *          
 *          responses:
 *              200:
 *                  description: edited the Role
 * 
 */

/**
 * @swagger
 *  /admin/roles/remove/{field}:
 *      delete:
 *          tags: [RBAC]
 *          summary: remove the Role
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true    
 *                  description: send title of role or objectId of role for remove that    
 *          responses:
 *              200:
 *                  description: removed the Role
 * 
 */