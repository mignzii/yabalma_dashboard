import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { format } from 'date-fns';
import {
  MapPin,
  MoreVertical
} from "lucide-react";


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { fr } from "date-fns/locale";
import { FaArrowRight } from 'react-icons/fa';
import Flag from "react-world-flags";
import { type Annonce } from '../schema';


interface AnnonceDisplayProps {
  annonce: Annonce | null
}

export function AnnonceDisplay({ annonce }: AnnonceDisplayProps) {
  const today = new Date()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center py-2 px-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-row text-base  items-center justify-center gap-3">
          <div className="font-bold  text-muted-foreground">Annonce de </div>     
          <div className="font-bold text-red-700 ">{annonce?.client?.prenom} {annonce?.client?.nom}</div>  
          </div>
               
        </div>
        <div className="ml-auto flex items-center gap-2">

        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!annonce}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {annonce ? (
        <div className="flex flex-1 flex-col max-h-[84vh] overflow-y-auto items-center ">
        <div className="flex w-full max-w-xl flex-col items-center  bg-white lg:p-6 xl:p-8 md:p-2 text-left">
                <h2 className="mb-2 text-base font-bold">
                  Auteur
                </h2>
                <div className="flex flex-col w-full items-center gap-2 ">
                                <Avatar className="hidden h-36 w-36  sm:flex">
                                <AvatarImage src={`${annonce.client?.img_url}`} className="rounded-full object-cover w-full h-full" alt="Avatar" />
                                <AvatarFallback>GP</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                <p className="text-lg font-bold leading-none text-red-700">
                                 
                                {annonce.client?.prenom} {annonce.client?.nom}
                                </p>
                                </div>
                        

                                <div className="line-clamp-2 flex flex-row gap-2 font-bold text-base text-muted-foreground">
                                    
                                <MapPin /> {annonce.lieu_depot}
                              </div>
                 
                </div> 
                <div className='flex flex-row gap-2 mt-2'>
                  <div className="flex flex-col items-center w-28 font-bold justify-center">
                     {annonce.source}
                    <Flag code="SN" className="h-8 w-10" /> 
                    </div>
                    <div className='flex items-center justify-center pt-4'>
                    <FaArrowRight/>
                    </div>
                    <div className="flex flex-col items-center w-28 font-bold justify-center">
                    {annonce.destination }
                    
                    <Flag code="FR" className="h-8 w-10" /> 
                    </div>
                  </div>
                {/* <div className="text-base grid grid-cols-2 font-bold p-4 rounded-md shadow-sm w-full gap-full">
                  <div className="font-normal text-base">ID</div>
                  <div className="text-sm">
                  {annonce.id}
                  </div>
                </div> */}
                <div className="pt-4 px-0 xl:px-2 w-full flex items-center justify-center flex-col">
                    <div className="text-sm grid grid-cols-2 whitespace-nowrap gap-aut items-center justify-start font-bold  w-full mt-4">
                      <div className="line-clamp-2 flex flex-row gap-12 p-1 font-bold text-sm text-muted-foreground">Tarif: </div>
                      <div className="text-sm text-red-700 flex items-end w-full justify-end">
                      {annonce.tarif}/KG
                      </div>
                    </div>

                    <div className="text-sm grid grid-cols-2 whitespace-nowrap gap-auto items-center justify-start font-bold  w-full mt-4">
                      <div className="line-clamp-2 flex flex-row gap-12 p-1 font-bold text-sm text-muted-foreground">Téléphone: </div>
                      <div className=" flex items-end w-full justify-end">
                      {annonce.client?.Tel}
                      </div>
                    </div>
                    <div className="text-sm grid grid-cols-2 whitespace-nowrap gap-auto items-center justify-start font-bold  w-full mt-4">
                      <div className="line-clamp-2 flex flex-row gap-12 p-1 font-bold text-sm text-muted-foreground">Publication: </div>
                      <div className="flex items-end w-full justify-end">
                        {format(new Date(annonce.created_at), 'dd MMMM yyyy', { locale: fr })}
                        {` à ${format(new Date(annonce.created_at), 'HH:mm')}`}
                      </div>
                    </div>
                    <div className="text-sm grid grid-cols-2 whitespace-nowrap gap-auto items-center justify-start font-bold  w-full mt-4">
                      <div className="line-clamp-2 flex flex-row gap-12 p-1 font-bold text-sm text-muted-foreground">Statut: </div>
                      <div className=" flex items-end w-full justify-end">
                      {annonce.statut}
                      </div>
                    </div>
                    <div className="text-sm grid grid-cols-2 whitespace-nowrap gap-auto items-center justify-start font-bold  w-full mt-4">
                      <div className="line-clamp-2 flex flex-row gap-12 p-1 font-bold text-sm text-muted-foreground">Depart: </div>
                      <div className="flex items-end w-full justify-end">
                        {format(new Date(annonce.date_depart), 'dd MMMM yyyy', { locale: fr })}
                        {` à ${format(new Date(annonce.date_depart), 'HH:mm')}`}
                      </div>
                    </div>
                    <div className="text-sm grid grid-cols-2 whitespace-nowrap gap-auto items-center justify-start font-bold  w-full mt-4">
                      <div className="line-clamp-2 flex flex-row gap-12 p-1 font-bold text-sm text-muted-foreground">Arrivee: </div>
                      <div className="flex items-end w-full justify-end">
                        {format(new Date(annonce.date_arrive), 'dd MMMM yyyy', { locale: fr })}
                        {` à ${format(new Date(annonce.date_arrive), 'HH:mm')}`}
                      </div>
                    </div>
                    
                    </div>
                    <div className="ml-auto pt-10 w-full items-center justify-center gap-4 flex font-medium">
                    <Button type="submit"  className="w-fit h-10 bg-red-600 font-bold">Supprimer</Button>
                      <Button type="submit"  className="w-fit h-10 font-bold">Modifier</Button>
                    </div>
              </div>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center p-8 text-center text-xl text-muted-foreground">
          Aucune annonce selectionnee
        </div>
      )}
    </div>
  )
}
