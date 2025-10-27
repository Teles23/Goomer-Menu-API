-- DropForeignKey
ALTER TABLE "public"."HorarioPromocao" DROP CONSTRAINT "HorarioPromocao_promocaoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Promocao" DROP CONSTRAINT "Promocao_produtoId_fkey";

-- AddForeignKey
ALTER TABLE "Promocao" ADD CONSTRAINT "Promocao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioPromocao" ADD CONSTRAINT "HorarioPromocao_promocaoId_fkey" FOREIGN KEY ("promocaoId") REFERENCES "Promocao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
