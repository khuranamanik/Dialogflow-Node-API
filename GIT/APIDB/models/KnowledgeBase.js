module.exports = (sequelize, type) => {
    return sequelize.define('KnowledgeBase', {
        KnowledgeBaseId: {
          type: type.INTEGER,
          primaryKey: true,
          unique:true
        },
        
        

        ProjectId: {
          type: type.STRING,
          primaryKey: false,
          autoIncrement: false,
          unique: true,
          foreignKey: true,
          references:{
            model:'Agents',
            Key:'ProjectId'
          },
        
        },
        displayName:{
          type : type.STRING
        },

        KnowledgeBaseFullName: {
          type : type.STRING,
        },
        
        
    })

}

