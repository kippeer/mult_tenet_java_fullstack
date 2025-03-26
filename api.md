{
  "openapi": "3.0.1",
  "info": {
    "title": "Multi-tenant API",
    "description": "API for multi-tenant patient management system",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:8080",
      "description": "Generated server url"
    }
  ],
  "paths": {
    "/api/patients/{id}": {
      "get": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "getPatient",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/Patient"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "updatePatient",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Patient"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/Patient"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "deletePatient",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        }
      }
    },
    "/api/patients": {
      "get": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "getAllPatients",
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Patient"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "createPatient",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Patient"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/Patient"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/register": {
      "post": {
        "tags": [
          "auth-controller"
        ],
        "operationId": "register",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/login": {
      "post": {
        "tags": [
          "auth-controller"
        ],
        "operationId": "login",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Patient": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "gender": {
            "type": "string"
          },
          "addressStreet": {
            "type": "string"
          },
          "addressNumber": {
            "type": "string"
          },
          "addressComplement": {
            "type": "string"
          },
          "addressNeighborhood": {
            "type": "string"
          },
          "addressCity": {
            "type": "string"
          },
          "addressState": {
            "type": "string"
          },
          "addressZipCode": {
            "type": "string"
          },
          "emergencyContactName": {
            "type": "string"
          },
          "emergencyContactPhone": {
            "type": "string"
          },
          "healthInsurance": {
            "type": "string"
          },
          "healthInsuranceNumber": {
            "type": "string"
          },
          "allergies": {
            "type": "string"
          },
          "medicalObservations": {
            "type": "string"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          },
          "name": {
            "type": "string"
          }
        }
      },
      "RegisterRequest": {
        "required": [
          "companyName",
          "email",
          "firstName",
          "lastName",
          "password"
        ],
        "type": "object",
        "properties": {
          "companyName": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "password": {
            "maxLength": 2147483647,
            "minLength": 6,
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          }
        }
      },
      "LoginRequest": {
        "required": [
          "email",
          "password"
        ],
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        }
      }
    }
  }
}