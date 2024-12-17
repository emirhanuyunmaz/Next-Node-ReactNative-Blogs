interface model{
    children:React.ReactNode
}

export default function TicketText({children}:model){
    return(<h6 className="text-blue-400 text-sm">{children}</h6>)
}