import Link from "next/link";

export default function MobileReserveButton({ reservation }) {
    return <Link className="mobile-reserve m-show" href={reservation.reservationLink}>{reservation.reservationText}</Link>
}