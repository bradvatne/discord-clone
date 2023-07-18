export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      channel_messages: {
        Row: {
          channel_id: number | null
          content: string
          message_id: number
          timestamp: string
          user_id: number | null
        }
        Insert: {
          channel_id?: number | null
          content: string
          message_id?: number
          timestamp?: string
          user_id?: number | null
        }
        Update: {
          channel_id?: number | null
          content?: string
          message_id?: number
          timestamp?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "channel_messages_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["channel_id"]
          },
          {
            foreignKeyName: "channel_messages_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      channels: {
        Row: {
          channel_id: number
          channel_name: string
          server_id: number | null
        }
        Insert: {
          channel_id?: number
          channel_name: string
          server_id?: number | null
        }
        Update: {
          channel_id?: number
          channel_name?: string
          server_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_server_id_fkey"
            columns: ["server_id"]
            referencedRelation: "servers"
            referencedColumns: ["server_id"]
          }
        ]
      }
      direct_messages: {
        Row: {
          content: string
          message_id: number
          receiver_id: number | null
          sender_id: number | null
          timestamp: string
        }
        Insert: {
          content: string
          message_id?: number
          receiver_id?: number | null
          sender_id?: number | null
          timestamp?: string
        }
        Update: {
          content?: string
          message_id?: number
          receiver_id?: number | null
          sender_id?: number | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "direct_messages_receiver_id_fkey"
            columns: ["receiver_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "direct_messages_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      server_members: {
        Row: {
          server_id: number
          user_id: number
        }
        Insert: {
          server_id: number
          user_id: number
        }
        Update: {
          server_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "server_members_server_id_fkey"
            columns: ["server_id"]
            referencedRelation: "servers"
            referencedColumns: ["server_id"]
          },
          {
            foreignKeyName: "server_members_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      servers: {
        Row: {
          creator_id: number | null
          server_id: number
          server_name: string
        }
        Insert: {
          creator_id?: number | null
          server_id?: number
          server_name: string
        }
        Update: {
          creator_id?: number | null
          server_id?: number
          server_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "servers_creator_id_fkey"
            columns: ["creator_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      users: {
        Row: {
          email: string
          password: string
          user_id: number
          username: string
        }
        Insert: {
          email: string
          password: string
          user_id?: number
          username: string
        }
        Update: {
          email?: string
          password?: string
          user_id?: number
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
