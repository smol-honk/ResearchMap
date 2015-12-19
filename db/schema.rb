# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151218064850) do

  create_table "activities", force: :cascade do |t|
    t.integer  "trackable_id",   limit: 4
    t.string   "trackable_type", limit: 255
    t.integer  "owner_id",       limit: 4
    t.string   "owner_type",     limit: 255
    t.string   "key",            limit: 255
    t.text     "parameters",     limit: 65535
    t.integer  "recipient_id",   limit: 4
    t.string   "recipient_type", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "activities", ["owner_id", "owner_type"], name: "index_activities_on_owner_id_and_owner_type", using: :btree
  add_index "activities", ["recipient_id", "recipient_type"], name: "index_activities_on_recipient_id_and_recipient_type", using: :btree
  add_index "activities", ["trackable_id", "trackable_type"], name: "index_activities_on_trackable_id_and_trackable_type", using: :btree

  create_table "follows", force: :cascade do |t|
    t.string   "follower_type",   limit: 255
    t.integer  "follower_id",     limit: 4
    t.string   "followable_type", limit: 255
    t.integer  "followable_id",   limit: 4
    t.datetime "created_at"
  end

  add_index "follows", ["followable_id", "followable_type"], name: "fk_followables", using: :btree
  add_index "follows", ["follower_id", "follower_type"], name: "fk_follows", using: :btree

  create_table "likes", force: :cascade do |t|
    t.string   "liker_type",    limit: 255
    t.integer  "liker_id",      limit: 4
    t.string   "likeable_type", limit: 255
    t.integer  "likeable_id",   limit: 4
    t.datetime "created_at"
  end

  add_index "likes", ["likeable_id", "likeable_type"], name: "fk_likeables", using: :btree
  add_index "likes", ["liker_id", "liker_type"], name: "fk_likes", using: :btree

  create_table "mailboxer_conversation_opt_outs", force: :cascade do |t|
    t.integer "unsubscriber_id",   limit: 4
    t.string  "unsubscriber_type", limit: 255
    t.integer "conversation_id",   limit: 4
  end

  add_index "mailboxer_conversation_opt_outs", ["conversation_id"], name: "index_mailboxer_conversation_opt_outs_on_conversation_id", using: :btree
  add_index "mailboxer_conversation_opt_outs", ["unsubscriber_id", "unsubscriber_type"], name: "index_mailboxer_conversation_opt_outs_on_unsubscriber_id_type", using: :btree

  create_table "mailboxer_conversations", force: :cascade do |t|
    t.string   "subject",    limit: 255, default: ""
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  create_table "mailboxer_notifications", force: :cascade do |t|
    t.string   "type",                 limit: 255
    t.text     "body",                 limit: 65535
    t.string   "subject",              limit: 255,   default: ""
    t.integer  "sender_id",            limit: 4
    t.string   "sender_type",          limit: 255
    t.integer  "conversation_id",      limit: 4
    t.boolean  "draft",                limit: 1,     default: false
    t.string   "notification_code",    limit: 255
    t.integer  "notified_object_id",   limit: 4
    t.string   "notified_object_type", limit: 255
    t.string   "attachment",           limit: 255
    t.datetime "updated_at",                                         null: false
    t.datetime "created_at",                                         null: false
    t.boolean  "global",               limit: 1,     default: false
    t.datetime "expires"
  end

  add_index "mailboxer_notifications", ["conversation_id"], name: "index_mailboxer_notifications_on_conversation_id", using: :btree
  add_index "mailboxer_notifications", ["notified_object_id", "notified_object_type"], name: "index_mailboxer_notifications_on_notified_object_id_and_type", using: :btree
  add_index "mailboxer_notifications", ["sender_id", "sender_type"], name: "index_mailboxer_notifications_on_sender_id_and_sender_type", using: :btree
  add_index "mailboxer_notifications", ["type"], name: "index_mailboxer_notifications_on_type", using: :btree

  create_table "mailboxer_receipts", force: :cascade do |t|
    t.integer  "receiver_id",     limit: 4
    t.string   "receiver_type",   limit: 255
    t.integer  "notification_id", limit: 4,                   null: false
    t.boolean  "is_read",         limit: 1,   default: false
    t.boolean  "trashed",         limit: 1,   default: false
    t.boolean  "deleted",         limit: 1,   default: false
    t.string   "mailbox_type",    limit: 25
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
  end

  add_index "mailboxer_receipts", ["notification_id"], name: "index_mailboxer_receipts_on_notification_id", using: :btree
  add_index "mailboxer_receipts", ["receiver_id", "receiver_type"], name: "index_mailboxer_receipts_on_receiver_id_and_receiver_type", using: :btree

  create_table "mentions", force: :cascade do |t|
    t.string   "mentioner_type",   limit: 255
    t.integer  "mentioner_id",     limit: 4
    t.string   "mentionable_type", limit: 255
    t.integer  "mentionable_id",   limit: 4
    t.datetime "created_at"
  end

  add_index "mentions", ["mentionable_id", "mentionable_type"], name: "fk_mentionables", using: :btree
  add_index "mentions", ["mentioner_id", "mentioner_type"], name: "fk_mentions", using: :btree

  create_table "people", force: :cascade do |t|
    t.string   "Name",            limit: 255
    t.string   "Location",        limit: 255
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
    t.decimal  "longitude",                     precision: 11, scale: 8
    t.decimal  "latitude",                      precision: 10, scale: 8
    t.text     "bio",             limit: 65535
    t.string   "title",           limit: 255
    t.boolean  "donor",           limit: 1
    t.date     "dateStart"
    t.date     "dateEnd"
    t.string   "keyword",         limit: 255
    t.date     "activeDateStart"
    t.date     "activeDateEnd"
    t.boolean  "active",          limit: 1
    t.string   "full_State",      limit: 255
    t.string   "abr_Country",     limit: 255
    t.string   "researchTitle",   limit: 255
    t.string   "program",         limit: 255
    t.string   "PI",              limit: 255
    t.string   "coPI",            limit: 255
  end

  create_table "researchers", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "first_name",             limit: 255
    t.string   "last_name",              limit: 255
  end

  add_index "researchers", ["email"], name: "index_researchers_on_email", unique: true, using: :btree
  add_index "researchers", ["reset_password_token"], name: "index_researchers_on_reset_password_token", unique: true, using: :btree

  create_table "researchers_users", id: false, force: :cascade do |t|
    t.integer "researcher_id", limit: 4
    t.integer "user_id",       limit: 4
  end

  create_table "researches", force: :cascade do |t|
    t.string   "name",          limit: 255
    t.string   "location",      limit: 255
    t.text     "abstract",      limit: 65535
    t.date     "dateStart"
    t.date     "dateEnd"
    t.float    "latitude",      limit: 24
    t.float    "longitude",     limit: 24
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "researcher_id", limit: 4
  end

  add_index "researches", ["researcher_id"], name: "index_researches_on_researcher_id", using: :btree

  create_table "researches_users", id: false, force: :cascade do |t|
    t.integer "research_id", limit: 4
    t.integer "user_id",     limit: 4
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255,   default: "", null: false
    t.string   "encrypted_password",     limit: 255,   default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,     default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "type",                   limit: 255
    t.string   "first_name",             limit: 255
    t.string   "last_name",              limit: 255
    t.text     "bio",                    limit: 65535
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "mailboxer_conversation_opt_outs", "mailboxer_conversations", column: "conversation_id", name: "mb_opt_outs_on_conversations_id"
  add_foreign_key "mailboxer_notifications", "mailboxer_conversations", column: "conversation_id", name: "notifications_on_conversation_id"
  add_foreign_key "mailboxer_receipts", "mailboxer_notifications", column: "notification_id", name: "receipts_on_notification_id"
  add_foreign_key "researches", "researchers"
end
