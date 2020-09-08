export interface JobProps {
  id: string;
  featured: boolean;
  location: string;
  company: CompanyProps;
  role: string;
  level: string;
  title: string;
  languages: string;
  tools: string;
  type: string;
  created_at: Date;
}

export interface CompanyProps {
  id: string;
  name: string;
  logo: {
    url: string;
  };
  jobs: JobProps[];
}
