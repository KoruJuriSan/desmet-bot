import couldBeInteger from "../lib/couldBeInteger.js";

export default class MysqlTableBuilder {
    name;
    mysqlClient;
    columns;
    
    constructor() {
        this.name = undefined
        this.mysqlClient = undefined
        this.columns = []
    }

    async setup() {
        const tables = await this.mysqlClient.query("show tables")
        const tablesNames = tables.map(element => Object.values(element)[0])

        if (tablesNames.includes(this.name)) {
            const mysqlColumns = await this.mysqlClient.query(`SHOW COLUMNS FROM ${this.name}`)
            const columns = this.columns
            for (const column of columns) {
                const hasColumn = mysqlColumns.some(element => {
                    return element.Field.toLowerCase() == column.Field.toLowerCase()
                })

                let hasSameType
                if (hasColumn) {
                    hasSameType = mysqlColumns.find(element => {
                        return element.Field.toLowerCase() == column.Field.toLowerCase()
                    }).Type.toLowerCase() == column.Type.toLowerCase()
                }
        
                if (!hasColumn) {
                    await this.mysqlClient.execute(`ALTER TABLE ${this.name} ADD COLUMN ${column.Field + " " + column.Type};`)
                } else if (!hasSameType) {
                    await this.mysqlClient.execute(`ALTER TABLE ${this.name} MODIFY COLUMN ${column.Field} ${column.Type};`)
                }
            }
        
            for (const column of mysqlColumns) {
                if (column.Key != "PRI" && column.Field != "guildid") {
                    const hasColumn = columns.some(element => {
                        return element.Field.toLowerCase() == column.Field.toLowerCase()
                    })
        
                    if (!hasColumn) {
                        await this.mysqlClient.execute(`ALTER TABLE ${this.name} DROP COLUMN ${column.Field};`)
                    }
                }
            }
        } else {
            await this.mysqlClient.execute(`CREATE TABLE ${this.name} (id INT AUTO_INCREMENT PRIMARY KEY, guildid BIGINT, ${this.columns.map(column => `${column.Field} ${column.Type}`)});`)
        }
        return this
    }

    setColumns(columns) {
        this.columns = columns
        return this
    }

    setName(name) {
        this.name = name
        return this
    }

    setClient(mysqlClient) {
        this.mysqlClient = mysqlClient
        return this
    }

    async getElements(guildid) {
        return await this.mysqlClient.query(`SELECT * FROM ${this.name} WHERE guildid = ${guildid};`)
    }

    async getElement(guildid, elementid) {
        if (couldBeInteger(elementid)) {
            const element = await this.mysqlClient.query(`SELECT * FROM ${this.name} WHERE guildid = ${guildid} AND id = ${elementid};`)
            if (element.length >= 1) {
                return element[0]
            } else {
                return
            }
        }
    }

    async removeElement(guildid, elementid) {
        const element = await this.getElement(guildid, elementid)
        const doesElementExist = element != undefined
        if (couldBeInteger(elementid) && doesElementExist) {
            await this.mysqlClient.execute(`DELETE FROM ${this.name} WHERE id = ${elementid} AND guildid = ${guildid};`)
        } else {
            return false
        }
        return true
    }

    async addElement(guildid, fieldsValues) {
        const fields = fieldsValues.map(element => element.Field)
        const values = fieldsValues.map(element => `"${element.Value}"`)
        try {
            await this.mysqlClient.execute(`INSERT INTO ${this.name} (guildid, ${fields}) VALUES (${guildid}, ${values})`)
        } catch(err) {
            console.log(`Got an error while trying to add an element to the database ${this.name}, error:`)
            console.error(err)
            return false
        }
        return true
    }
}