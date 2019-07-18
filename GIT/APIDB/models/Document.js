module.exports = (sequelize, type) => {
    return sequelize.define('Document', {
        DocumentId: {
          type: type.INTEGER,
          primaryKey: true,
          unique:true
        },
        KnowledgeBaseId: {
          type: type.INTEGER,
          primaryKey: false,
          autoIncrement: false,
          unique: true,
          foreignKey: true,
          references:{
          model:'KnowledgeBases',
          Key:'KnowledgeBaseId'
          }
        },

        
        DisplayName:{
          type : type.STRING
        },
        
        DocumnetName: {
          type : type.STRING
        },
        DocumnetPath: {
            type : type.STRING
        },
        KnowledgeTypes: {
            type : type.STRING
        },
        MimeType: {
            type : type.STRING
        },
      })

}