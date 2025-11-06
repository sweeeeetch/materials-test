export interface Material {
  id: string | number;
  title: string;
  short_description: string;
  datetime: string;
  description_html?: string;
  description_json?: any;
}

export interface MaterialFormData {
  id?: string | number;
  title: string;
  short_description: string;
  datetime: string;
  description_html: string;
  description_json: any;
}

export interface ValidationErrors {
  title?: string;
  short_description?: string;
  datetime?: string;
  description?: string;
}
