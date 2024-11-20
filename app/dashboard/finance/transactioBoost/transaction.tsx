"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  MapPin,
  Phone,
  UserRoundSearch
} from "lucide-react";

import { getallcommandes, getCommandesForCurrentMonthCount } from "@/app/api/commandes/route";
import { Commande } from "@/app/dashboard/commandes/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Drawer from '@mui/material/Drawer';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { CSSProperties, useEffect, useState } from "react";
import { FaArrowRight } from 'react-icons/fa';
import BeatLoader from "react-spinners/BeatLoader";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


export default function TransactionBoost()  {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommande, setSelectedCommande] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddingClient, setIsAddingClient] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTransaction, settotalTransaction] = useState(0);
  const [totalTransactionMonth, settotalTransactionMonth] = useState(0);


  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [total, setTotal] = useState(0);

  const [commandes, setCommandes] = useState<Commande[]>([]);

  

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {

        const data: any = await getallcommandes()
        console.log(data)

        if (data && data.length > 0) {
          console.log(data)
          settotalTransaction(data.length);
          setCommandes(data)
          // setTotal(data.length); 
         
        }
        
      } catch (error) {
        console.error("Error fetching room details:", error)
      }try {

        const data: any = await getCommandesForCurrentMonthCount()
        console.log(data)

        if (data > 0) {
          console.log(data)
          settotalTransactionMonth(data)
          // setTotal(data.length); 
         
        }
        
      } catch (error) {
        console.error("Error fetching room details:", error)
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

const router = useRouter();


const handleNavigation = (idUser:string) => {
  // Par exemple, naviguer vers la page de profil en passant l'ID de l'utilisateur en paramètre
  router.push(`/dashboard/utilisateurs/Clients/profile?id=${idUser}`);
};

  const handleUserClick = (user: any) => {
    setSelectedCommande(user);
    setIsAddingClient(false);
    setIsDrawerOpen(true);
  };

  const handleAddClientClick = () => {
    setSelectedCommande(null);
    setIsAddingClient(true);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedCommande(null);
    setIsAddingClient(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="sweet-loading">
          <BeatLoader
            color={color}
            loading={isLoading}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden max-h-[70vh] overflow-y-auto flex-1 flex-col p-2 md:flex">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold">Nombres de Transactions</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-black font-bold">{totalTransaction}</div>
                    <p className="text-xs text-muted-foreground">
                      +0% depuis le mois dernier
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold">
                    Nombres de Transactions du mois
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-black font-bold">{totalTransactionMonth}</div>
                    <p className="text-xs text-muted-foreground">
                    -100% par rapport au dernier mois
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold">
                    Total généré par les boosts
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-green-600 font-bold">450.569 FCFA</div>
                    <p className="text-xs text-muted-foreground">
                      +2.1% depuis le mois dernier
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold">
                    Total généré par les boosts sur ce mois
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-green-600 font-bold">100.569 FCFA</div>
                    <p className="text-xs text-muted-foreground">
                      +4.1% par rapport au dernier mois
                    </p>
                  </CardContent>
                </Card>
              </div>
        {/* Tableau des données */}
        <DataTable 
        data={commandes}
        columns={columns}
        onRowClick={handleUserClick}
        currentPage={currentPage} 
        total={total} 
        setCurrentPage={setCurrentPage} 
      />

      
       
      </div>

      <Drawer anchor='right' open={isDrawerOpen} onClose={closeDrawer}>
        <div className="p-4 mt-24 flex w-[30vw]">
            { selectedCommande && (
             <div className="flex flex-1 flex-col h-full overflow-y-auto items-center justify-center">
             <div className="flex w-full max-w-xl flex-col items-center justify-center bg-slate-50 p-8 text-left">
     
                     <div className="flex flex-row gap-2 w-full mb-4">
                         <div className="flex flex-col w-full items-center gap-2 ">
                                     <div className="mb-2 text-base font-bold leading-none">
                                       Client
                                     </div>
                                         <Avatar className="hidden h-28 w-28  sm:flex">
                                         <AvatarImage src={`${selectedCommande.client?.img_url}`} className="rounded-full object-cover w-full h-full" alt="Avatar" />
                                         <AvatarFallback>client</AvatarFallback>
                                         </Avatar>
                                         <div className="grid gap-1">
                                         <p className="text-base font-bold leading-none text-red-700">
                                         
                                         {selectedCommande.client?.prenom} {selectedCommande.client?.nom}
                                         </p>
                                         </div>
                                 
     
                                         <div className="line-clamp-2 flex flex-row gap-2 font-bold text-base text-muted-foreground">
                                             
                                         <MapPin /> {selectedCommande.client?.Tel}
                                       </div>
                         
                         </div> 
                         <div className="flex flex-col w-full items-center gap-2 ">
                         <div className="mb-2 text-base font-bold leading-none">
                                       GP
                                     </div>
                                         <Avatar className="hidden h-28 w-28  sm:flex">
                                         <AvatarImage src={`${selectedCommande.annonce?.client?.img_url}`} className="rounded-full object-cover w-full h-full" alt="Avatar" />
                                         <AvatarFallback>client</AvatarFallback>
                                         </Avatar>
                                         <div className="grid gap-1">
                                         <p className="text-base font-bold leading-none text-red-700">
                                         
                                         {selectedCommande.annonce?.client?.prenom} {selectedCommande.annonce?.client?.nom}
                                         </p>
                                         </div>
                                 
     
                                         <div className="line-clamp-2 flex flex-row gap-2 font-bold text-base text-muted-foreground">
                                             
                                         <Phone /> {selectedCommande.annonce?.client?.Tel}
                                       </div>
                         
                         </div> 
                     </div>
                    
                     <div className='flex flex-row gap-2 mt-8'>
                       <div className="flex flex-col items-center w-28 font-bold justify-center">
                          {selectedCommande.annonce?.source }
                         {/* <Flag code={selectedCommande.annonce?.source.code} className="h-8 w-10" />  */}
                         </div>
                         <div className='flex items-center justify-center pt-4'>
                         <FaArrowRight/>
                         </div>
                         <div className="flex flex-col items-center w-28 font-bold justify-center">
                         {selectedCommande.annonce?.destination }
                         
                         {/* <Flag code={selectedCommande.annonce?.destination.code} className="h-8 w-10" />  */}
                         </div>
                       </div>
                     {/* <div className="text-base grid grid-cols-2 font-bold p-4 rounded-md shadow-sm w-full gap-full">
                       <div className="font-normal text-base">ID</div>
                       <div className="text-sm">
                       {selectedCommande.id}
                       </div>
                     </div> */}
                     <div className="pt-8 px-2 lg:px-2 xl:px-2 w-full grid items-center gap-0 justify-center grid-cols-2">
                       <div className="flex flex-row w-full col-span-2 gap-14 ">
                       <div className="text-base grid grid-cols-2 gap-auto items-center justify-center font-bold w-full mt-4">
                           <div className="line-clamp-2 flex flex-row gap-12 p-1 font-bold text-base text-muted-foreground">Tarif: </div>
                           <div className="text-base text-red-700 flex items-end w-full justify-end">
                           {selectedCommande.annonce?.poids_max}F/KG
                           </div>
                         </div>
                         <div className="text-base grid grid-cols-2 gap-auto items-center justify-center font-bold  w-full mt-4">
                           <div className="line-clamp-2 flex flex-row gap-12 p-1 font-bold text-base text-muted-foreground">Statut </div>
                           <div className="text-base text-red-700 flex items-end w-full justify-end">
                           {selectedCommande.annonce?.statut}
                           </div>
                         </div>
                       </div>
                       
                       <div className="flex flex-row w-full col-span-2 gap-14 ">
                         <div className="text-base grid grid-cols-2 gap-auto items-center justify-center font-bold  w-full mt-4">
                           <div className="line-clamp-2 flex flex-row gap-12 p-1 font-bold text-base text-muted-foreground">Stocks: </div>
                           <div className=" flex items-end w-full text-red-700 justify-end">
                           {selectedCommande.annonce?.stock_annonce} 
                           </div>
                         </div>
                         <div className="text-base grid grid-cols-2 gap-auto items-center justify-center font-bold  w-full mt-4">
                           <div className="line-clamp-2 flex flex-row gap-12 p-1 font-bold text-base text-muted-foreground">Transport: </div>
                           <div className=" flex items-end w-full justify-end">
                           {selectedCommande.annonce?.type_transport} 
     
                           </div>
                         </div>
                         </div>
     
     
                         <div className="text-base grid grid-cols-2 col-span-2 gap-auto items-center justify-center font-bold  w-full mt-4">
                           <div className="line-clamp-2 flex flex-row gap-12 p-1 font-bold text-base text-muted-foreground">Commande passée le: </div>
                           <div className="flex items-end w-full justify-end">
                             {format(new Date(selectedCommande.created_at), 'dd MMMM yyyy', { locale: fr })}
                             {` à ${format(new Date(selectedCommande.created_at), 'HH:mm')}`}
                           </div>
                         </div>
                         
     
                         <div className="flex flex-col w-full col-span-2 gap-4 ">

                          <div className="text-base grid grid-cols-2 col-span-2 gap-auto items-center justify-center font-bold  w-full mt-4">
                           <div className="line-clamp-2 flex flex-row p-1 gap-4 font-bold text-base text-muted-foreground"><UserRoundSearch /> Destinataire: </div>
                           <div className="flex items-end w-full justify-end">
                           {selectedCommande.detail_commande.first_name} {selectedCommande.detail_commande.last_name}
                           </div>
                         </div>


                          <div className="text-base grid grid-cols-2 gap-auto items-center justify-center font-bold  w-full ">
                            <div className="line-clamp-2 flex flex-row gap-4  p-1 font-bold text-base text-muted-foreground"><Phone /> Telephone:</div>
                            <div className="flex items-end w-full justify-end">
                            {selectedCommande.detail_commande.phone_number}

                            </div>
                          </div>

                          <div className="text-base grid grid-cols-2 gap-auto items-center justify-center font-bold  w-full ">
                            <div className="line-clamp-2 flex flex-row gap-4  p-1 font-bold text-base text-muted-foreground"><MapPin />  lieu de livraison:</div>
                            <div className="flex items-end w-full justify-end">
                            {selectedCommande.detail_commande.location} {selectedCommande.detail_commande.code_postal}

                            </div>
                          </div>

                         </div>
    
                        
                       
                         
                         </div>
                         <div className="ml-auto pt-24 w-full items-center justify-center flex font-medium">
                                        <Button onClick={() => handleNavigation(selectedCommande.id_client)} className="w-fit h-10 font-bold">Voir Détails</Button>   
                         </div>
                   </div>
             </div>
            )}
        </div>
      </Drawer>
  </>
  );


}


  

   