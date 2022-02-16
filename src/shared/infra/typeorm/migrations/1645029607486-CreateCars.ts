import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCars1645029607486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "cars",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                },
                {
                  name: "name",
                  type: "varchar",
                },
                {
                  name: "description",
                  type: "varchar",
                },
                {
                  name: "daily_rate",
                  type: "numeric",
                },
                {
                  name: "available",
                  type: "boolean",
                  default: true,
                },
                {
                  name: "license_plate",
                  type: "varchar",
                },
                {
                  name: "fine_amount",
                  type: "numeric",
                },
                {
                  name: "brand",
                  type: "varchar",
                },
                {
                  name: "category_id",
                  type: "uuid",
                  isNullable: true,
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
                },
              ],
              foreignKeys: [
                  {
                      name: "FKCategoryCar",
                      referencedTableName: "categories", // tabela de origem(pai)
                      referencedColumnNames: ["id"], // quando o category_id for "chamado" ira fazer referencia ao id da tabela categories (origem)
                      columnNames: ["category_id"], // quando o category_id for referenciado ira buscar dentro da tabela categories o id (destino)
                      onDelete: "SET NULL", // quando o id da tabela de origem for deletado, ira setar o valor do id da tabela de destino como null // se a propriedade fosse cascade iria deletar tudo no destino
                      onUpdate: "SET NULL", // quando o id da tabela de origem for atualizado, ira setar o valor do id da tabela de destino como null // se a propriedade fosse cascade iria deletar tudo no destino
                  },
              ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars");
    }

}
