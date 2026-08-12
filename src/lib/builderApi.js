import { supabase, supabaseConfigured } from "./supabase";
import generateBuilderId from "../utils/generateBuilderId";

const PHOTOS_BUCKET = "builder-photos";

class BuilderApiError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "BuilderApiError";
    this.cause = cause;
  }
}

function ensureConfigured() {
  if (!supabaseConfigured) {
    throw new BuilderApiError(
      "Backend isn't configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file and restart the dev server."
    );
  }
}

function extensionFromFile(file) {
  const fromName = file?.name?.split(".").pop();
  if (fromName && fromName.length <= 5) return fromName.toLowerCase();
  const fromType = file?.type?.split("/").pop();
  return fromType ? fromType.toLowerCase() : "jpg";
}

export async function uploadBuilderPhoto(file, builderId) {
  ensureConfigured();

  const ext = extensionFromFile(file);
  const path = `${builderId}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(PHOTOS_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) {
    throw new BuilderApiError(
      "We couldn't upload your photo. Please try again.",
      uploadError
    );
  }

  const { data } = supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(path);

  if (!data?.publicUrl) {
    throw new BuilderApiError(
      "Your photo uploaded but we couldn't get a shareable link for it."
    );
  }

  return data.publicUrl;
}

export async function createBuilderPass({
  name,
  role,
  techStack,
  title,
  status,
  photoFile,
}) {
  ensureConfigured();

  let lastError = null;

  for (let attempt = 0; attempt < 3; attempt++) {
    const builderId = generateBuilderId();

    try {
      const imageUrl = await uploadBuilderPhoto(photoFile, builderId);

      const { data, error } = await supabase
        .from("builders")
        .insert({
          builder_id: builderId,
          name,
          role,
          tech_stack: techStack,
          title,
          status: status || null,
          image_url: imageUrl,
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          lastError = error;
          continue;
        }
        throw new BuilderApiError(
          "We couldn't save your Builder Pass. Please try again.",
          error
        );
      }

      return data;
    } catch (err) {
      if (err instanceof BuilderApiError) throw err;
      lastError = err;
    }
  }

  throw new BuilderApiError(
    "We couldn't save your Builder Pass. Please try again.",
    lastError
  );
}

export async function getBuilderPass(builderId) {
  ensureConfigured();

  const { data, error } = await supabase
    .from("builders")
    .select("*")
    .eq("builder_id", builderId)
    .maybeSingle();

  if (error) {
    throw new BuilderApiError(
      "We couldn't load this Builder Pass. Please try again.",
      error
    );
  }

  return data || null;
}

export { BuilderApiError };