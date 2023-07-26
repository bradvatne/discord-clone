export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      channels: {
        Row: {
          channel_id: number;
          channel_name: string;
          created_at: string;
          server_id: number;
          updated_at: string;
        };
        Insert: {
          channel_id?: number;
          channel_name: string;
          created_at?: string;
          server_id: number;
          updated_at?: string;
        };
        Update: {
          channel_id?: number;
          channel_name?: string;
          created_at?: string;
          server_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "channels_server_id_fkey";
            columns: ["server_id"];
            referencedRelation: "servers";
            referencedColumns: ["server_id"];
          }
        ];
      };
      messages: {
        Row: {
          channel_id: number;
          created_at: string;
          message: string;
          message_id: number;
          user_id: string;
        };
        Insert: {
          channel_id: number;
          created_at?: string;
          message: string;
          message_id?: number;
          user_id: string;
        };
        Update: {
          channel_id?: number;
          created_at?: string;
          message?: string;
          message_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_channel_id_fkey";
            columns: ["channel_id"];
            referencedRelation: "channels";
            referencedColumns: ["channel_id"];
          },
          {
            foreignKeyName: "messages_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      servers: {
        Row: {
          created_at: string;
          owner_id: string;
          server_id: number;
          server_name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          owner_id: string;
          server_id?: number;
          server_name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          owner_id?: string;
          server_id?: number;
          server_name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "servers_owner_id_fkey";
            columns: ["owner_id"];
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      user_servers: {
        Row: {
          created_at: string;
          server_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          server_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          server_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_servers_server_id_fkey";
            columns: ["server_id"];
            referencedRelation: "servers";
            referencedColumns: ["server_id"];
          },
          {
            foreignKeyName: "user_servers_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          user_id: string;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type ChannelsTable = Database["public"]["Tables"]["channels"]["Row"];
export type MessagesTable = Database["public"]["Tables"]["messages"];
export type ServersTable = Database["public"]["Tables"]["servers"]["Row"];
export type UserServersTable = Database["public"]["Tables"]["user_servers"];
export type UsersTable = Database["public"]["Tables"]["users"];
