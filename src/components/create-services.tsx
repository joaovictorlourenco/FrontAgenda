import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CreateService() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Criar um novo serviço no sistema</DialogDescription>
      </DialogHeader>
      <form className="space-y-6">
        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input type="text" className="col-span-3" id="name" />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea className="col-span-3" id="description" />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="value">Valor</Label>
          <Input type="number" className="col-span-3" id="value" />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="Model">Modelo</Label>
          <Input type="text" className="col-span-3" id="Model" />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="default">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
