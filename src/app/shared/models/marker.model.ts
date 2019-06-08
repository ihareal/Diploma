export class Marker {
    lat: number;
    lng: number;
    title: string;
    description: string;
    label?: string;
    draggable?: boolean;
    animation?: 'DROP' | 'BOUNCE' | '';
}
