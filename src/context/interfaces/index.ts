export interface IActions {
  getPerfil: () => void;
  hasPermission: (role: IRole) => void;
  hasRole: (role: IRole) => void;
  sesionModal: (sesionModal: boolean) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  setSesionModal: (sesionModal: boolean) => void;
  setUser: (user: IUser) => void;
}

// Interfaces para usuarios, roles y permisos en el contexto
export interface IRole {
  description?: string;
  id?: number;
  name?: string;
  permissions?: IPermission[];
}

export interface IPermission {
  description?: string;
  id?: number;
  name?: string;
}

export interface IUser {
  celular?: string;
  correoElectronico?: string;
  direccion?: string;
  documento?: number;
  expires_in?: number;
  fechaNacimiento?: string;
  genero?: string;
  id?: number;
  imagenUrl?: string;
  nombre?: string;
  permissions?: IPermission[];
  personaID?: number;
  roles?: IRole[];
  token?: string;
  usuarioID?: number;
}
