type FetchImagesFromCDN = {
  total_count: number;
  time: number;
  resources: Resource[];
  rate_limit_allowed: number;
  rate_limit_reset_at: Date;
  rate_limit_remaining: number;
};

type Resource = {
  asset_id: string;
  public_id: string;
  folder: Folder;
  filename: string;
  format: Format;
  version: number;
  resource_type: ResourceType;
  type: Type;
  created_at: Date;
  uploaded_at: Date;
  bytes: number;
  backup_bytes: number;
  width: number;
  height: number;
  aspect_ratio: number;
  pixels: number;
  url: string;
  secure_url: string;
  status: Status;
  access_mode: AccessMode;
  access_control: null;
  etag: string;
  created_by: EdBy | null;
  uploaded_by: EdBy | null;
  last_updated?: LastUpdated;
  context?: Context;
  isActive: boolean;
};

enum AccessMode {
  Public = "public",
}

type Context = {
  favorite: string;
};

type EdBy = {
  access_key: string;
};

enum Folder {
  Gallery = "gallery",
}

enum Format {
  Jpg = "jpg",
  PNG = "png",
}

type LastUpdated = {
  updated_at: Date;
  public_id_updated_at?: Date;
  context_updated_at?: Date;
};

enum ResourceType {
  Image = "image",
}

enum Status {
  Active = "active",
}

enum Type {
  Upload = "upload",
}
export type { FetchImagesFromCDN };
